<template>
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
definePageMeta({
    title: '开发工具',
    icon: 'ep:magic-stick',
    order: 3,
})

onBeforeMount(() => {
    console.log('✅装载:开发工具')
})

onBeforeUnmount(() => {
    console.log('❌卸载:开发工具')
})
</script>
