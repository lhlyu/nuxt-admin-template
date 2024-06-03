const useLogin = () => {
    const loginForm = reactive({
        account: 'admin',
        password: 'admin',
        remember: false,
    })

    const appConfig = useAppConfig()

    const token = useCookie<string>('nuxt-admin-template-token')

    const login = async () => {
        token.value = +new Date() + ''
        await navigateTo(appConfig.admin)
    }

    const logout = async () => {
        token.value = ''
        await navigateTo(appConfig.login)
    }

    return {
        loginForm,
        token,
        login,
        logout,
    }
}

export default useLogin
