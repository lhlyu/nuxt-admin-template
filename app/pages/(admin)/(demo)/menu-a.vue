<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单A</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '菜单A',
    icon: 'lucide:heading-1',
    order: 0,
    parent: {
        title: '一级菜单',
        icon: 'lucide:layout-list',
        order: 3,
    },
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
