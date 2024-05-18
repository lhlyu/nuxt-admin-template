// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
    app: {
        head: {
            htmlAttrs: {
                lang: 'zh-cmn-Hans',
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: '管理系统',
        },
        rootTag: 'body',
    },
    vite: {
        vueJsx: {},
    },
    imports: {
        dirs: ['stores']
    },
    css: [
        "@arco-design/web-vue/dist/arco.css"
    ],
    build: {
        analyze: {
            enabled: true,
        },
    },
    hooks: {

    },
})
