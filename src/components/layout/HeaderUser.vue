<template>
    <el-space>
        <el-icon @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
            <component :is="$colorMode.value === 'dark' ? Sunny : Moon"></component>
        </el-icon>
    </el-space>
</template>

<script setup lang="ts">
import {Sunny, Moon} from '@element-plus/icons-vue'
</script>

<style></style>
