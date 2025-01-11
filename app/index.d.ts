declare module '#app' {
    // 菜单信息
    interface MenuMeta {
        // 标题
        title?: string
        // 图标，建议使用 https://icones.js.org/
        // 例子: 'ep:memo'
        icon?: string
        // 是否在菜单栏隐藏，默认：false
        hidden?: boolean
        // 菜单栏排序，值越小越靠前，默认是0，按照字母升序
        order?: number
        // 角色，默认：不限制
        role?: string[]
        // 自定义属性
        [key: string]: unknown
    }

    // 自定义pageMeta
    interface PageMeta extends MenuMeta {
        // 父级菜单信息
        // 同个目录下的page文件，只要有一个文件声明了父级菜单信息，
        // 那么这个目录下page都属于这个父级菜单的子菜单
        // 严禁一个目录下的pages都声明父级菜单信息，最好是在index.vue进行声明
        // 如果存在多个声明，以第一个为准
        parent?: MenuMeta
    }

    interface MenuItem {
        name: string
        title: string
        hidden: boolean
        order: number
        icon: string
        role: string[]
        filepath: string
        layer: number
        parentName: string
        children: MenuItem[]
    }
}

export {}
