<template>
    <a-layout>
        <Title>{{ $route.meta.title }}</Title>
        <a-layout-sider
            collapsible
            :hide-trigger="true"
            :default-collapsed="sider.defaultCollapsed"
            :collapsed="sider.collapsed"
            :collapsed-width="sider.collapsedWidth"
            :class="sider.collapseClass"
            :width="240"
        >
            <a-button
                v-if="!(sider.collapsed && !sider.collapsedWidth)"
                class="aside-nav-btn"
                shape="circle"
                size="small"
                @click="onCollapsed"
            >
                <Icon
                    name="ri:arrow-right-s-line"
                    size="20px"
                    v-if="sider.collapsed"
                ></Icon>
                <Icon
                    name="ri:arrow-left-s-line"
                    size="20px"
                    v-else
                ></Icon>
            </a-button>

            <slot name="header-logo"></slot>
            <IshtarSiderBar></IshtarSiderBar>
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <div class="top">
                    <div class="left">
                        <template v-if="!!sider.collapsedWidth">
                            <IshtarBreadcrumb></IshtarBreadcrumb>
                        </template>
                        <template v-else>
                            <Icon
                                name="ri:menu-fold-4-line"
                                size="20px"
                                v-if="sider.collapsed"
                                @click="onCollapsed"
                            ></Icon>
                            <Icon
                                name="ri:menu-unfold-4-line-2"
                                size="20px"
                                v-else
                                @click="onCollapsed"
                            ></Icon>
                        </template>
                    </div>
                    <div class="right">
                        <a-space size="medium">
                            <a-button
                                shape="circle"
                                size="mini"
                                @click="toggleTheme"
                            >
                                <template #icon>
                                    <Icon
                                        v-if="mode === 'dark'"
                                        name="ri:sun-line"
                                    ></Icon>
                                    <Icon
                                        v-else
                                        name="ri:moon-line"
                                    ></Icon>
                                </template>
                            </a-button>
                            <slot name="header-user"></slot>
                        </a-space>
                    </div>
                </div>
            </a-layout-header>
            <a-layout>
                <a-layout-content>
                    <slot></slot>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
const {sider, onCollapsed, mode, toggleTheme} = useIshtarLayout()
</script>

<style lang="scss" scoped>
.arco-layout {
    height: 100%;
}
.arco-layout-sider {
    box-sizing: border-box;
    border-right: 1px solid var(--color-border-2) !important;
    box-shadow: unset !important;
    user-select: none;
}
.arco-layout-header {
    box-sizing: border-box;
    color: var(--color-text-1);
    background-color: var(--color-bg-2);

    .top {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid var(--color-border-2);

        .left {
            display: flex;
            align-items: center;
        }

        .right {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;
        }
    }
}

.arco-layout-content {
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
    color: var(--color-text-1);
    background-color: var(--color-bg-3);
}

.logo {
    box-sizing: border-box;
    height: 50px;
    padding: 0 8px;
    border-bottom: 1px solid var(--color-border-2);
}
.aside-nav-btn {
    position: absolute;
    top: 35%;
    right: -16px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-3) !important;
    border: 1px solid var(--color-border-2) !important;
    transition: all 0.15s;
}
.mobile-layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2999;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
    transition: all 0.3s;
}
</style>
