<template>
    <header>
        <el-space>
            <el-avatar :size="24" src="/logo.webp" />
            <el-text tag="b" :line-clamp="1">Nuxt Admin</el-text>
        </el-space>
        <slot></slot>
    </header>
</template>

<script setup lang="ts"></script>

<style></style>
