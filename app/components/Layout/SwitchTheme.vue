<template>
    <Transition name="rotate" mode="out-in">
        <el-icon
            v-if="$colorMode.value === 'dark'"
            @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
        >
            <Sunny />
        </el-icon>
        <el-icon v-else @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'">
            <Moon />
        </el-icon>
    </Transition>
</template>

<script setup lang="ts">
import {Sunny, Moon} from '@element-plus/icons-vue'
</script>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
    transition: all 0.2s ease;
}

.rotate-enter-from {
    transform: rotate(270deg);
    opacity: 0;
}

.rotate-leave-to {
    transform: rotate(180deg);
    opacity: 0;
}
</style>
