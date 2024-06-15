export default defineNuxtRouteMiddleware((to, from) => {
    const appConfig = useAppConfig()

    const { getToken } = useLogin()

    if (getToken()) {
        if (!to.path.startsWith(appConfig.admin)) {
            return navigateTo(appConfig.admin)
        }
        return
    }
    if (to.path.startsWith(appConfig.admin)) {
        return navigateTo(appConfig.login)
    }
})
