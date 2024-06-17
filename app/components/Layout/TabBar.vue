<template>
    <div class="tab-bar">
        <div class="left">
            <el-button link :icon="ArrowLeft" @click="handleArrowScroll()" />
        </div>
        <div class="center" :id="id">
            <el-tag
                v-for="t in tabs"
                :key="t.name"
                size="large"
                closable
                :id="t.path"
                :effect="t.name === active ? 'dark' : 'plain'"
                type="primary"
                @click="switchTab(t.path)"
                @close="closeTab(t.name)"
            >
                {{ t.title }}
            </el-tag>
        </div>
        <div class="right" ref="center">
            <el-button link :icon="ArrowRight" @click="handleArrowScroll(false)" />
        </div>
        <div class="menu">
            <ClientOnly>
                <el-dropdown trigger="click">
                    <el-button link :icon="ArrowDown" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="closeOtherTabs">关闭其他标签页</el-dropdown-item>
                            <el-dropdown-item @click="closeLeftTabs">关闭左边标签页</el-dropdown-item>
                            <el-dropdown-item @click="closeRightTabs">关闭右边标签页</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowDown } from '@element-plus/icons-vue'

const id = useId()

// 左右滚动
const handleArrowScroll = (prev: boolean = true) => {
    const dom = document.getElementById(id)
    if (dom) {
        const scrollWidth = dom.scrollWidth
        // 每次偏移值
        const offset = dom.clientWidth / 2
        const scrollLeft = dom.scrollLeft

        let left = prev ? scrollLeft - offset : scrollLeft + offset
        if (left <= 0) {
            left = 0
        } else if (left > scrollWidth) {
            left = scrollWidth
        }
        dom.scrollTo({ left: left, behavior: 'smooth' })
    }
}

const route = useRoute()

const tabs = useState('tabs', () => [
    {
        name: route.name as string,
        icon: route.meta?.icon as string | undefined,
        title: (route.meta?.title ?? route.name) as string,
        path: route.fullPath,
    },
])

const active = useState('tab-active', () => route.name as string)

onBeforeRouteUpdate((to, from) => {
    const t = setTimeout(() => {
        document.getElementById(to.fullPath)?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
        clearTimeout(t)
    }, 100)
    active.value = to.name as string
    if (tabs.value.some((item) => item.name === to.name)) {
        return
    }
    tabs.value.push({
        name: to.name as string,
        icon: to.meta?.icon as string | undefined,
        title: (to.meta?.title ?? to.name) as string,
        path: to.fullPath,
    })
})

const switchTab = async (path: string) => {
    await navigateTo(path)
}

const appConfig = useAppConfig()

const closeTab = async (name: string) => {
    tabs.value = tabs.value.filter((item) => item.name !== name)
    if (active.value === name) {
        if (tabs.value.length > 0) {
            await switchTab(tabs.value[0].path)
            return
        }
        if (route.fullPath === appConfig.admin) {
            tabs.value = [
                {
                    name: route.name as string,
                    icon: route.meta?.icon as string | undefined,
                    title: (route.meta?.title ?? route.name) as string,
                    path: route.fullPath,
                },
            ]
            return
        }
        await switchTab(appConfig.admin)
    }
}

const closeOtherTabs = () => {
    const v = tabs.value.find((value) => value.name === active.value)
    tabs.value = v ? [v] : []
}

const closeLeftTabs = () => {
    const index = tabs.value.findIndex((value) => value.name === active.value)
    tabs.value = tabs.value.slice(index)
}

const closeRightTabs = () => {
    const index = tabs.value.findIndex((value) => value.name === active.value)
    tabs.value = tabs.value.slice(0, index + 1)
}
</script>

<style scoped lang="scss">
.tab-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;

    .left {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 40px;
        height: 100%;
        background-color: var(--el-bg-color);
        border-right: var(--el-border);
        cursor: pointer;
    }

    .center {
        display: flex;
        flex: 1;
        align-items: center;
        box-sizing: border-box;
        height: 100%;
        padding: 0 8px;
        overflow: auto;
        scroll-snap-type: x mandatory;
        // 这个属性用来控制当滚动到区域的水平边界时的浏览器行为
        // 防止左滑右滑到底时触发路由前进后退
        overscroll-behavior-x: none;

        &::-webkit-scrollbar {
            display: none;
        }

        .el-tag {
            height: 32px;
            cursor: pointer;
            scroll-snap-align: center;
        }

        .el-tag:not(:first-child) {
            margin-left: 8px;
        }
    }

    .right {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 40px;
        height: 100%;
        background-color: var(--el-bg-color);
        border-left: var(--el-border);
        cursor: pointer;
    }

    .menu {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 40px;
        height: 100%;
        background-color: var(--el-bg-color);
        border-left: var(--el-border);
        cursor: pointer;
    }
}
</style>
