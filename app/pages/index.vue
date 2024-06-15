<template>
    <Title>登录</Title>
    <main>
        <el-form class="login" label-width="auto" label-position="top" size="large" :model="loginForm">
            <el-form-item>
                <h1>管理系统</h1>
            </el-form-item>
            <el-form-item label="账号">
                <el-input autocomplete="off" clearable v-model="loginForm.account" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" clearable autocomplete="off" show-password v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
                <el-checkbox label="记住密码" v-model="loginForm.remember" />
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="login"> 登录 </el-button>
            </el-form-item>
        </el-form>
    </main>
</template>

<script lang="ts" setup>
const { loginForm, login } = useLogin()
</script>

<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: var(--el-bg-color-page);
    user-select: none;

    .login {
        width: 100%;
        max-width: 400px;

        h1 {
            width: 100%;
            margin: 0;
            padding: 0;
            text-align: center;
        }
    }
}
</style>
