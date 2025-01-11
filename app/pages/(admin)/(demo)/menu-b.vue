<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单B</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '菜单B',
    icon: 'lucide:heading-2',
    order: 2,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
