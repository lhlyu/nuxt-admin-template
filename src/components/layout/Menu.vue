<template>
    <menu>
        <el-menu default-active="2">
            <el-sub-menu index="32">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                </template>
                <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item
                v-for="v in 10"
                :index="v + ''"
            >
                <el-icon><setting /></el-icon>
                <span>Navigator Four {{ v }}</span>
            </el-menu-item>
        </el-menu>
    </menu>
</template>

<script setup lang="ts">
import {Location, Setting} from '@element-plus/icons-vue'
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
