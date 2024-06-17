export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.error('errorHandler.error:', error)
        console.error('errorHandler.info:', info)
    }

    nuxtApp.hook('vue:error', (error, instance, info) => {
        console.error('vue.error:', error)
        console.error('vue.info:', info)
    })
})
