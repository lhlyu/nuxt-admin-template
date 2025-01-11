import type { NuxtPage } from '@nuxt/schema'
import type { MenuItem } from '#app'
import path from 'node:path'
import { getName } from './utils'

export const menusDeclare = `import type { MenuItem } from '#app'

declare module '#menus' {
    const menus: MenuItem[];
    export const menuObject: Record<string, MenuItem>;
    export const findMenu: (name: string) => MenuItem; 
    export const findParents: (name: string) => MenuItem[]; 
    export default menus;
}`

// 计算当前的路由所处菜单层级
// nuxt有种特殊的路由需要考虑
// 文档: https://nuxt.com/docs/guide/directory-structure/pages#route-groups
// 例子:
//   - `admin/index.vue` -> 1
//   - `admin/user/index.vue` -> 2
//   - `admin/(user)/index.vue` -> 1
//   - `(admin)/(user)/index.vue` -> 1
//   - `(admin)/(user)/school/(class)/index.vue` -> 3
//   - `(admin)/user/school/(class)/index.vue` -> 4
function calculateLayer(filepath: string): number {
    // 按路径分隔符分割路径
    const segments = path.dirname(filepath).split(path.sep)

    let layer = 0
    let optional = false

    segments.forEach((segment) => {
        if (!segment.trim().length) {
            return
        }
        if (segment.startsWith('(') && segment.endsWith(')')) {
            if (optional) {
                return
            }
            optional = true
            layer += 1
            return
        }
        optional = false
        layer += 1
    })
    return layer
}

// 排序，按照 oder asc, filepath asc的方式
function sortItems(items: MenuItem[]): MenuItem[] {
    // 先对当前层级的元素进行排序
    items.sort((a, b) => {
        if (a.order !== b.order) {
            return a.order - b.order
        } else {
            return a.filepath.localeCompare(b.filepath)
        }
    })

    // 递归地对每个元素的 children 进行排序
    items.forEach((item) => {
        if (item.children && item.children.length > 0) {
            item.children = sortItems(item.children)
        }
    })

    return items
}

// 构建树
function buildMenuTree(items: MenuItem[]): MenuItem[] {
    // 创建一个Map来存储所有节点，键是id，值是节点
    const map = new Map<string, MenuItem>()
    items.forEach((item) => {
        item.children = []
        map.set(item.name, item)
    })

    // 创建根节点数组
    const root: MenuItem[] = []

    // 将节点加入树结构中
    items.forEach((item) => {
        if (item.layer === 1) {
            // 如果是根节点，加入根节点数组
            root.push(item)
        } else {
            // 否则，找到父节点，并将当前节点加入父节点的children数组
            const parent = map.get(item.parentName)
            if (parent) {
                parent.children.push(item)
            }
        }
    })

    return sortItems(root)
}

// 根据页面生成菜单
const generateMenus = (root: string, pages: NuxtPage[]): string => {
    const parents: MenuItem[] = []

    const menuItems: MenuItem[] = []

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i]

        if (page.meta?.layout) {
            continue
        }

        if (page.meta?.hidden) {
            continue
        }

        if (page.meta?.parent?.title) {
            const parent = page.meta.parent

            // 相对路径
            const relativePath = page.file!.slice(root.length)

            const name = path.dirname(relativePath)

            const layer = calculateLayer(relativePath)

            const p: MenuItem = {
                name: getName('d', name),
                title: parent.title ?? name,
                hidden: parent.hidden ?? false,
                order: parent.order ?? 0,
                icon: parent.icon ?? '',
                role: parent.role ?? [],
                filepath: name,
                layer: layer,
                parentName: '',
                children: [],
            }

            parents.push(p)
            menuItems.push(p)
        }

        // 相对路径
        const relativePath = page.file!.slice(root.length)
        const layer = calculateLayer(relativePath)

        menuItems.push({
            name: getName('p', relativePath),
            title: page.meta?.title ?? relativePath,
            hidden: page.meta?.hidden ?? false,
            order: page.meta?.order ?? 0,
            icon: page.meta?.icon,
            role: page.meta?.role ?? [],
            filepath: relativePath,
            layer: layer,
            parentName: '',
            children: [],
        })
    }

    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i]
        const count = menuItem.filepath.split(path.sep).length

        let dir = menuItem.filepath

        for (let j = 0; j < count; j++) {
            dir = dir.slice(0, dir.lastIndexOf(path.sep))

            const m = parents.find((value) => {
                return value.filepath === dir
            })

            if (!m) {
                continue
            }

            menuItems[i].layer = m.layer + 1
            menuItems[i].parentName = m.name

            break
        }
    }

    const menuObject: Record<string, MenuItem> = {}

    menuItems.forEach((item) => {
        menuObject[item.name] = item
    })

    const exports = []

    exports.push(`export const menuObject = ${JSON.stringify(menuObject, null, 4)};`)

    exports.push(`export const findMenu = (name) => {
    const item = menuObject[name]

    if (!item) {
        return []
    }
    return item
}`)

    exports.push(`export const findParents = (name) => {
    let item = menuObject[name]

    if (!item) {
        return []
    }
    const parents = []
    parents.push(item)
    while (1) {
        item = menuObject[item.parentName]

        if (!item) {
            return parents
        }

        parents.unshift(item)
    }
    return parents
}`)

    const result = buildMenuTree(menuItems)

    exports.push(`export default ${JSON.stringify(result, null, 4)};`)

    return exports.join('\n\n')
}

export default generateMenus
