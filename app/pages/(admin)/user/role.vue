<template>
    <el-card>
        <template #header>
            <el-text tag="b">角色管理</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>
<script setup lang="ts">
definePageMeta({
    title: '角色管理',
    icon: 'lucide:square-user-round',
    order: 1,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
