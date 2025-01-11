<template>
    <Html :class="siteStore.theme"></Html>
    <NuxtLoadingIndicator :duration="10000" />
    <NuxtLayout>
        <NuxtPage :keepalive="{ include: actives }"></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
const siteStore = useSiteStore()

const { actives } = useTabBar()
</script>

<style lang="scss">
::view-transition-new(root),
::view-transition-old(root) {
    /* 关闭默认动画，否则影响自定义动画的执行 */
    animation: none;
}

:root.dark::view-transition-old(root) {
    z-index: 9999;
}

body {
    position: fixed;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: var(--el-bg-color);
    transition: background-color var(--el-transition-duration-fast);
    inset: 0;
}
:focus-visible {
    outline: none;
}
</style>
