// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    srcDir: 'src/',
    devtools: {enabled: false},
    modules: [
        '@vueuse/nuxt',
        '@nuxtjs/device',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/color-mode',
        '@element-plus/nuxt',
    ],
    elementPlus: {
        importStyle: false,
    },
    colorMode: {
        preference: 'light',
        fallback: 'light',
        classPrefix: '',
        classSuffix: '',
    },
    css: ['element-plus/theme-chalk/dark/css-vars.css'],
    app: {
        head: {
            htmlAttrs: {
                lang: 'zh-cmn-Hans',
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: '管理系统',
            link: [
                {
                    href: 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.7.3/index.min.css',
                    rel: 'stylesheet',
                },
            ],
            // script: [
            //     {
            //         src: 'https://cdn.jsdelivr.net/npm/eruda',
            //         type: 'text/javascript',
            //     },
            //     { innerHTML: 'eruda.init()' },
            // ],
        },
        rootTag: 'body',
    },
    vite: {
        vueJsx: {},
    },
    imports: {
        dirs: ['stores'],
    },
    build: {
        analyze: {
            enabled: true,
        },
    },
    features: {
        inlineStyles: false,
    },
})
