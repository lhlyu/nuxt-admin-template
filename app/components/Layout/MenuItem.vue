<template>
    <template v-for="v in menus" :key="v.name">
        <el-sub-menu v-if="v.children?.length" :index="v.name as string">
            <template #title>
                <el-icon v-if="v.meta?.icon">
                    <Icon :name="v.meta?.icon as string"></Icon>
                </el-icon>
                <span>{{ v.meta?.title ?? v.name }}</span>
            </template>
            <LayoutMenuItem :menus="v.children"></LayoutMenuItem>
        </el-sub-menu>
        <el-menu-item v-else :index="v.name as string" @click="() => jump(v)">
            <el-icon v-if="v.meta?.icon">
                <Icon :name="v.meta?.icon as string"></Icon>
            </el-icon>
            <span>{{ v.meta?.title ?? v.name }}</span>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps({
    menus: {
        type: Array as PropType<RouteRecordRaw[]>,
        default: () => [],
    },
})

const jump = async (r: RouteRecordRaw) => {
    await navigateTo(r)
}
</script>

<style scoped></style>
