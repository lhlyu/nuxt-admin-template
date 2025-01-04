<template>
    <el-input v-model="v"></el-input>
</template>

<script setup lang="ts">
definePageMeta({
    title: '页面创建',
    icon: 'ep:document-add',
})

const v = ref('页面创建')

onBeforeMount(() => {
    console.log('✅装载:页面创建')
})

onBeforeUnmount(() => {
    console.log('❌卸载:页面创建')
})
</script>

<style scoped></style>
