<template>
    <menu>
        <el-menu
            :default-active="$route.name as string"
            :default-openeds="$route.matched.map((v) => v.name) as string[]"
        >
            <LayoutMenuItem :menus="menus"></LayoutMenuItem>
        </el-menu>
    </menu>
</template>

<script setup lang="ts">
import type {RouteRecordRaw} from 'vue-router'

const router = useRouter()

// 给路由排序，按照order值，由小到大
const sortRoutes = (routes: RouteRecordRaw[]) => {
    routes.sort((a, b) => (a.meta?.order as number ?? 0) - (b.meta?.order as number ?? 0))
    
    // 递归地对每个路由的children进行排序
    routes.forEach(route => {
        if (route.children && route.children.length) {
            sortRoutes(route.children);
        }
    })
}

// 指定目录下的页面才会生成菜单
const menuPath = '/admin'

const menus = computed<RouteRecordRaw[]>(() => {
    const rs = router.options.routes.find((value) => value.path === menuPath)?.children ?? []
    const frs = rs.filter(value => value.meta?.hide !== true)
    sortRoutes(frs)
    return frs
})
</script>

<style lang="scss">
menu {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .el-menu {
        --el-menu-active-color: var(--el-color-primary-dark-2);
        --el-menu-item-height: 40px;
        --el-menu-sub-item-height: var(--el-menu-item-height);
        box-sizing: border-box;
        height: 100%;
        background-color: var(--el-bg-color);
        border: none;
        .el-menu-item.is-active {
            background-color: rgba(var(--el-color-primary-rgb), 0.1);
        }
    }
}
</style>
