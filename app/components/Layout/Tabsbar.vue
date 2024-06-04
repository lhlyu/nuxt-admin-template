<template>
    <div class="tabs-bar">
        <div class="left">
            <el-button link :icon="ArrowLeft" @click="handleArrowScroll()" />
        </div>
        <div class="center" :id="id" >
            <el-button type="primary" plain>菜单</el-button>
            <el-button plain v-for="v in 30" :key="v">菜单{{ v }}</el-button>
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
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
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
        
        let left = prev ? (scrollLeft - offset) : (scrollLeft + offset)
        if (left <= 0) {
            left = 0
        } else if (left > scrollWidth) {
            left = scrollWidth
        }
        dom.scrollTo({left: left, behavior: "smooth"})
    }
}

</script>

<style scoped lang="scss">
.tabs-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;
    
    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 40px;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--el-bg-color);
        border-right: var(--el-border);
        cursor: pointer;
    }
    
    .center {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 8px;
        box-sizing: border-box;
        overflow: auto;
        scroll-snap-type: x mandatory;
        // 这个属性用来控制当滚动到区域的水平边界时的浏览器行为
        // 防止左滑右滑到底时触发路由前进后退
        overscroll-behavior-x: none;
        
        &::-webkit-scrollbar {
            display: none;
        }
        
        .el-button {
            scroll-snap-align: center;
        }
        
        .el-button:not(:first-child) {
            margin-left: 8px;
        }
    }
    
    .right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 40px;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--el-bg-color);
        border-left: var(--el-border);
        cursor: pointer;
    }
    
    .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 40px;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--el-bg-color);
        border-left: var(--el-border);
        cursor: pointer;
    }
}
</style>