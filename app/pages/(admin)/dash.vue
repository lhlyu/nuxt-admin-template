<template>
    <el-card>
        <template #header>
            <el-text tag="b">仪表板</el-text>
        </template>
        <el-input v-model="text" />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '仪表板',
    icon: 'lucide:house',
    order: -1,
})

const text = ref('')
</script>

<style scoped lang="scss"></style>
