<template>
    <Title>{{ $route.meta.title ?? '管理后台' }}</Title>
    <Transition name="slide">
        <aside v-show="!isCollapse" :class="{ 'aside-mobile': device.isMobile }">
            <LayoutHeaderLogo>
                <LayoutSidebarButton v-show="!isCollapse" @click="isCollapse = !isCollapse"></LayoutSidebarButton>
            </LayoutHeaderLogo>
            <el-scrollbar>
                <LayoutSideMenu></LayoutSideMenu>
            </el-scrollbar>
        </aside>
    </Transition>
    <article>
        <header>
            <el-space size="large">
                <LayoutSidebarButton v-if="isCollapse" @click="isCollapse = !isCollapse"></LayoutSidebarButton>
                <LayoutBreadcrumb v-if="!device.isMobile"></LayoutBreadcrumb>
                <div v-else></div>
            </el-space>
            <LayoutHeaderUser></LayoutHeaderUser>
        </header>
        <nav>
            <LayoutTabBar></LayoutTabBar>
        </nav>
        <main>
            <ClientOnly>
                <NuxtPage></NuxtPage>
                <el-backtop target="main" />
            </ClientOnly>
        </main>
    </article>
</template>

<script setup lang="ts">
const device = useDevice()
const isCollapse = ref(device.isMobile)
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
    transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
    width: 0;
}

.slide-enter-to,
.slide-leave-from {
    width: 300px;
}

body {
    display: flex;
    background-color: var(--el-bg-color);

    aside {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        box-sizing: border-box;
        width: 300px;
        height: 100%;
        overflow: hidden;
        background-color: inherit;
        border-right: var(--el-border);
        user-select: none;
    }

    .aside-mobile {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3000;
    }

    header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        height: 60px;
        padding: 0 20px;
        background-color: inherit;
        border-bottom: var(--el-border);
        user-select: none;

        .el-icon {
            cursor: pointer;
        }
    }

    article {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 0;

        nav {
            flex-shrink: 0;
            box-sizing: border-box;
            height: 40px;
            background-color: var(--el-bg-color-page);
            border-bottom: var(--el-border);
            user-select: none;
        }

        main {
            flex: 1;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow: auto;
            background-color: var(--el-bg-color-page);
        }
    }
}
</style>
