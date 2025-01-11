<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单E</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '菜单E',
    icon: 'lucide:heading-5',
    order: 2,
    parent: {
        title: '二级菜单',
        icon: 'lucide:layout-list',
    },
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
