<template>
    <el-button text circle @click="toggle">
        <template #icon>
            <Transition name="rotate" mode="out-in">
                <el-icon v-if="siteStore.theme === 'dark'">
                    <Sunny />
                </el-icon>
                <el-icon v-else>
                    <Moon />
                </el-icon>
            </Transition>
        </template>
    </el-button>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'

const siteStore = useSiteStore()

const toggleTheme = () => {
    const isDark = siteStore.theme === 'dark'
    siteStore.theme = isDark ? 'light' : 'dark'
}

// 判断是否支持视图过渡，并且没有开启“减少动态效果”选项
const isAppearanceTransition =
    typeof document !== 'undefined' &&
    // @ts-expect-error: Transition API
    document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 切换颜色模式函数
const toggle = async (event: MouseEvent) => {
    if (!isAppearanceTransition) {
        return
    }

    const { clientX: x, clientY: y } = event
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
        toggleTheme()
        await nextTick()
    })

    transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        document.documentElement.animate(
            {
                clipPath: siteStore.theme === 'dark' ? clipPath.reverse() : clipPath,
            },
            {
                duration: 400,
                easing: 'ease-in',
                pseudoElement:
                    siteStore.theme === 'dark' ? '::view-transition-old(root)' : '::view-transition-new(root)',
            },
        )
    })
}
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
