<template>
    <NuxtLayout name="ishtar">
        <template #header-logo>
            <LayoutHeaderLogo></LayoutHeaderLogo>
        </template>
        <template #header-user>
            <LayoutHeaderUser></LayoutHeaderUser>
        </template>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    icon: 'ri:home-4-line',
    title: '管理',
})

useFetch('/api/user/search')
</script>

<style scoped></style>
