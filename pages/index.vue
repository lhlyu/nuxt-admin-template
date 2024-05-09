<template>
    <button @click="jump">跳转</button>
</template>

<script setup lang="ts">
definePageMeta({
    icon: 'ri:home-3-line',
    title: '仪表板',
})

const router = useRouter()

const jump = () => {
    router.push('/admin')
}
</script>

<style scoped></style>
