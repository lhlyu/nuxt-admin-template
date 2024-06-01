<template>
    <Title>登录</Title>
    <main>
        <el-card class="login" shadow="never">
            <el-form label-width="auto">
                <el-form-item>
                    <h2>管理系统</h2>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </main>
    
</template>

<script lang="ts" setup>
const login = async () => {
    await navigateTo('/admin')
}
</script>

<style lang="scss" scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: var(--el-bg-color-page);
    
    .login {
        width: 92%;
        max-width: 400px;
        
        h2 {
            margin: 0;
            padding: 0;
        }
    }
}
</style>
