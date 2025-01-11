<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单D</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '菜单D',
    icon: 'lucide:heading-4',
    order: 1,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
