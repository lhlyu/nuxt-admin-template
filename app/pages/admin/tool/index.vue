<template>
    <el-input v-model="v"></el-input>
</template>

<script setup lang="ts">
definePageMeta({
    title: '页面创建',
    icon: 'ep:document-add',
})

const v = ref('页面创建')
</script>

<style scoped></style>
