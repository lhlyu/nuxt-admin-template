<template>
    <el-text
        :line-clamp="1"
        truncated
    >
        <el-breadcrumb>
            <el-breadcrumb-item
                v-for="v in $route.matched.slice(1)"
                :key="v.name"
                >{{ v.meta?.title ?? v.name }}</el-breadcrumb-item
            >
        </el-breadcrumb>
    </el-text>
</template>

<script setup lang="ts"></script>

<style></style>
