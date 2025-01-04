<template>
    <el-image style="width: 200px" src="/logo.webp" />
</template>

<script setup lang="ts">
definePageMeta({
    title: '仪表板',
    icon: 'ep:odometer',
})

onBeforeMount(() => {
    console.log('✅装载:仪表板')
})

onBeforeUnmount(() => {
    console.log('❌卸载:仪表板')
})
</script>

<style scoped></style>
