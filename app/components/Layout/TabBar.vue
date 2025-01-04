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
                <el-space :size="4">
                    <el-icon v-if="t?.icon">
                        <Icon :name="t?.icon as string"></Icon>
                    </el-icon>
                    <span>{{ t.title }}</span>
                </el-space>
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

const { id, handleArrowScroll, tabs, active, switchTab, closeTab, closeOtherTabs, closeLeftTabs, closeRightTabs } =
    useTabBar()
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
