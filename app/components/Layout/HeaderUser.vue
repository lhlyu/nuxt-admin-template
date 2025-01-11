<template>
    <el-space>
        <el-button text circle :icon="Refresh" @click="refreshPage"></el-button>
        <el-badge is-dot :offset="[-6, 6]">
            <el-button text circle :icon="Bell"></el-button>
        </el-badge>
        <LayoutSwitchTheme></LayoutSwitchTheme>
        <el-dropdown :teleported="false">
            <el-space>
                <el-avatar :size="24" src="/logo.webp" />
                <el-text tag="b" :line-clamp="1">管理员</el-text>
            </el-space>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="Setting">设置</el-dropdown-item>
                    <el-dropdown-item :icon="SwitchButton" @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-space>
</template>

<script setup lang="ts">
import { Setting, SwitchButton, Bell, Refresh } from '@element-plus/icons-vue'

const { logout } = useLogin()

const router = useRouter()

// 刷新当前页面
const refreshPage = async () => {
    router.go(0)
}
</script>

<style></style>
