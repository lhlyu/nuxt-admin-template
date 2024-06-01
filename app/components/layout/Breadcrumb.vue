<template>
    <el-breadcrumb>
        <el-breadcrumb-item
            v-for="v in $route.matched.slice(1)"
            :key="v.name"
            >{{ v.meta?.title ?? v.name }}</el-breadcrumb-item
        >
    </el-breadcrumb>
</template>

<script setup lang="ts"></script>

<style></style>
