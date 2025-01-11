<template>
    <el-card>
        <template #header>
            <el-text tag="b">菜单G</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    name: 'group-f',
    title: '菜单G',
    icon: 'lucide:heading-3',
    order: 3,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
