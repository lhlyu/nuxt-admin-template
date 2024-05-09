<template>
    <a-card
        :style="{width: '360px'}"
        title="添加用户"
    >
        <template #extra>
            <a-link>More</a-link>
        </template>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
        started out as a news recommendation engine and gradually evolved into a platform delivering content in various
        formats.
        <a-input
            placeholder=""
            allow-clear
        />
    </a-card>
</template>

<script setup lang="ts">
definePageMeta({
    icon: 'ri:user-add-line',
    title: '添加用户',
})
</script>

<style scoped></style>
