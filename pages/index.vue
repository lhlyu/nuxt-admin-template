<template>
    <Title>登录</Title>
    <a-form :model="form" class="form" auto-label-width @submit="jump">
        <a-form-item hide-label>
            <h1>登录</h1>
        </a-form-item>
        <a-form-item field="account" label="账号" hide-label>
            <a-input v-model="form.account" placeholder="账号" :max-length="16" allow-clear>
                <template #prefix>
                    <Icon name="ri:user-3-line"></Icon>
                </template>
            </a-input>
        </a-form-item>
        <a-form-item field="password" label="密码" hide-label>
            <a-input v-model="form.password" placeholder="密码" :max-length="16" allow-clear>
                <template #prefix>
                    <Icon name="ri:lock-password-line"></Icon>
                </template>
            </a-input>
        </a-form-item>
        <a-form-item field="remember" hide-label>
            <div class="remember">
                <a-checkbox v-model="form.remember">记住密码</a-checkbox>
                <a-button
                    shape="circle"
                    size="mini"
                >
                    <template #icon>
                        <Icon
                            name="ri:sun-line"
                        ></Icon>
<!--                        <Icon-->
<!--                            v-else-->
<!--                            name="ri:moon-line"-->
<!--                        ></Icon>-->
                    </template>
                </a-button>
            </div>
        </a-form-item>
        <a-form-item hide-label>
            <a-button html-type="submit">登录</a-button>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">

const router = useRouter()

const form = reactive({
    account: '',
    password: '',
    remember: false,
})

const jump = () => {
    router.push('/admin')
}
</script>

<style lang="scss">
body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-1);
    
    .form {
        max-width: 460px;
        width: 100%;
        padding: 24px 32px;
        border-radius: 16px;
        box-sizing: border-box;
        border: 1px solid var(--color-border);
        background-color: var(--color-bg-3);
        user-select: none;
        
        h1 {
            width: 100%;
            text-align: center;
            color: var(--color-text-1);
        }
        
        .remember {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
