<template>
    <menu>
        <el-menu
            :default-active="$route.name as string"
            :default-openeds="findParents($route.name as string).map((item) => item.name)"
        >
            <LayoutMenuItem :menus="menus"></LayoutMenuItem>
        </el-menu>
    </menu>
</template>

<script setup lang="ts">
import menus, { findParents } from '#menus'
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
