<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单I</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '菜单I',
    icon: 'lucide:heading-6',
    parent: {
        title: '三级菜单',
        icon: 'lucide:layout-list',
    },
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
