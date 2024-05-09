<template>
    <a-dropdown trigger="hover">
        <a-space
            size="mini"
            class="header-user"
        >
            <a-avatar :size="20">
                <img
                    src="/logo.png"
                    alt="avatar"
                />
            </a-avatar>
            <span>管理员</span>
        </a-space>
        <template #content>
            <a-doption>
                <template #icon>
                    <Icon name="ri:settings-3-line"></Icon>
                </template>
                <template #default>设置</template>
            </a-doption>
            <a-doption>
                <template #icon>
                    <Icon name="ri:logout-circle-r-line"></Icon>
                </template>
                <template #default>退出</template>
            </a-doption>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header-user {
    cursor: pointer;
    user-select: none;
}
</style>
