<template>
    <a-tabs
        hide-content
        editable
        auto-switch
    >
        <template #extra>
            <a-dropdown
                trigger="hover"
                position="bl"
            >
                <a-button>
                    <template #icon>
                        <Icon
                            name="ri:apps-line"
                            size="16px"
                        ></Icon>
                    </template>
                </a-button>
                <template #content>
                    <a-doption>
                        <template #icon>
                            <Icon name="ri:refresh-line"></Icon>
                        </template>
                        刷新页面
                    </a-doption>
                    <a-doption>
                        <template #icon>
                            <Icon name="ri:close-line"></Icon>
                        </template>
                        关闭其他
                    </a-doption>
                    <a-doption>
                        <template #icon>
                            <Icon name="ri:arrow-left-line"></Icon>
                        </template>
                        关闭左侧
                    </a-doption>
                    <a-doption>
                        <template #icon>
                            <Icon name="ri:arrow-right-line"></Icon>
                        </template>
                        关闭右侧
                    </a-doption>
                    <a-doption>
                        <template #icon>
                            <Icon name="ri:close-line"></Icon>
                        </template>
                        关闭全部
                    </a-doption>
                </template>
            </a-dropdown>
        </template>
        <a-tab-pane
            v-for="v in 2"
            :key="v"
            :title="`Tab${v}`"
        ></a-tab-pane>
    </a-tabs>
</template>

<script setup lang="ts"></script>

<style>
.arco-tabs {
    user-select: none;
}
.arco-tabs-nav-extra {
    margin-right: 16px;
}
</style>
