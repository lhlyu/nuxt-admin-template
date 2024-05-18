import {
    createResolver,
    defineNuxtModule,
    addPlugin,
    addImportsDir,
    addComponentsDir,
    addLayout,
    installModule,
} from 'nuxt/kit'
import type {NuxtPage} from '@nuxt/schema'

const {resolve} = createResolver(import.meta.url)

export default defineNuxtModule({
    meta: {
        name: 'nuxt-ishtar',
        configKey: 'ishtar',
        compatibility: {
            nuxt: '^3.0.0',
        },
    },
    async setup(options, nuxt) {
        await installModule('@vueuse/nuxt')
        await installModule('nuxt-icon')

        nuxt.hook('pages:extend', (pages) => {
            const pageDir = nuxt.options.rootDir + '/pages/'
            const start = pageDir.length
            function setName(items: NuxtPage[]) {
                for (const page of items) {
                    const end = page.file!.length - 4
                    const name = page.file!.substring(start, end).replaceAll('/', '+')
                    page.name = name
                    if (page.children) {
                        setName(page.children)
                    }
                }
            }
            setName(pages)
        })

        addPlugin({
            src: resolve('runtime/plugins/arco.ts'),
        })

        addImportsDir(resolve('./runtime/composables'))

        await addComponentsDir({
            path: resolve('./runtime/components'),
            pathPrefix: false,
            prefix: 'Ishtar',
            global: true,
        })

        addLayout(
            {
                src: resolve('runtime/layouts/ishtar.vue'),
                filename: 'ishtar.vue',
            },
            'ishtar',
        )
    },
})
