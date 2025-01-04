<template>
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">
definePageMeta({
    title: '用户管理',
    icon: 'ep:user',
    order: 2,
})

onBeforeMount(() => {
    console.log('✅装载:用户管理')
})

onBeforeUnmount(() => {
    console.log('❌卸载:用户管理')
})
</script>
