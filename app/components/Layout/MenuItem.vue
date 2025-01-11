<template>
    <template v-for="v in menus" :key="v.name">
        <el-sub-menu v-if="v.children?.length" :index="v.name as string">
            <template #title>
                <el-icon v-if="v?.icon">
                    <Icon :name="v.icon as string"></Icon>
                </el-icon>
                <span>{{ v.title ?? v.name }}</span>
            </template>
            <LayoutMenuItem :menus="v.children"></LayoutMenuItem>
        </el-sub-menu>
        <el-menu-item v-else :index="v.name as string" @click="() => jump(v)">
            <el-icon v-if="v.icon">
                <Icon :name="v.icon as string"></Icon>
            </el-icon>
            <span>{{ v.title ?? v.name }}</span>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { MenuItem } from '#app'

const props = defineProps({
    menus: {
        type: Array as PropType<MenuItem[]>,
        default: () => [],
    },
})

const jump = async (r: MenuItem) => {
    const result = await navigateTo({ name: r.name })
}
</script>

<style scoped></style>
