<template>
    <el-card>
        <template #header>
            <el-text tag="b">个人设置</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '个人设置',
    icon: 'lucide:user-round-cog',
    order: 1,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
