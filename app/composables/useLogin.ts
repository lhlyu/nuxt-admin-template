const tokenKey = 'nuxt-admin-template-token'

const useLogin = () => {
    const loginForm = reactive({
        account: 'admin',
        password: 'admin',
        remember: false,
    })

    const appConfig = useAppConfig()

    const getToken = () => {
        return useCookie(tokenKey).value
    }

    const login = async () => {
        useCookie(tokenKey).value = +new Date() + ''
        await navigateTo(appConfig.admin)
    }

    const logout = async () => {
        useCookie(tokenKey).value = null
        await navigateTo(appConfig.login)
    }

    return {
        loginForm,
        getToken,
        login,
        logout,
    }
}

export default useLogin
