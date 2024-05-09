<template>
    <div class="header-logo">
        <a-space :size="20">
            <img
                width="18"
                alt="logo"
                src="/logo.png"
            />
            <span>管理后台</span>
        </a-space>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header-logo {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding-left: 15px;
    overflow: hidden;
    color: var(--color-text-1);
    line-height: 50px;
    border-bottom: 1px solid var(--color-border-2) !important;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    user-select: none;

    span {
        font-weight: bold;
        font-size: 20px;
        white-space: nowrap;
    }
}
</style>
