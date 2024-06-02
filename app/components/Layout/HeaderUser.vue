<template>
    <ClientOnly>
        <el-space size="large">
            <LayoutSwitchTheme></LayoutSwitchTheme>
            <el-dropdown :teleported="false">
                <el-space>
                    <el-avatar
                        :size="24"
                        src="/logo.webp"
                    />
                    <el-text :line-clamp="1">管理员</el-text>
                </el-space>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="Setting">设置</el-dropdown-item>
                        <el-dropdown-item
                            :icon="SwitchButton"
                            @click="logout"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-space>
    </ClientOnly>
</template>

<script setup lang="ts">
import {Setting, SwitchButton} from '@element-plus/icons-vue'

const {logout} = useLogin()
</script>

<style></style>
