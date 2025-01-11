<template>
    <el-text :line-clamp="1" truncated>
        <el-breadcrumb>
            <el-breadcrumb-item v-for="v in findParents($route.name as string)" :key="v.name">{{
                v.title ?? v.name
            }}</el-breadcrumb-item>
        </el-breadcrumb>
    </el-text>
</template>

<script setup lang="ts">
import { findParents } from '#menus'
</script>

<style></style>
