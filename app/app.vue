<template>
    <NuxtLoadingIndicator :duration="5000" />
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts"></script>
<style lang="scss">
body {
    position: fixed;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: var(--el-bg-color);
    inset: 0;
}
:focus-visible {
    outline: none;
}
</style>
