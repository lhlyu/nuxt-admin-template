<template>
    <el-input v-model="v"></el-input>
</template>

<script setup lang="ts">
definePageMeta({
    title: '表单生成',
    icon: 'ep:brush',
})

const v = ref('表单生成')

onBeforeMount(() => {
    console.log('✅装载:表单生成')
})

onBeforeUnmount(() => {
    console.log('❌卸载:表单生成')
})
</script>

<style scoped></style>
