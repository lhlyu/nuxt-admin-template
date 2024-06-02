export default defineNuxtRouteMiddleware((to, from) => {
    const appConfig = useAppConfig()

    const {token} = useLogin()

    if (token.value) {
        if (!to.path.startsWith(appConfig.admin)) {
            return navigateTo(appConfig.admin)
        }
        return
    }
    if (to.path.startsWith(appConfig.admin)) {
        return navigateTo(appConfig.login)
    }
})
