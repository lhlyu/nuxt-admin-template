import { createResolver, defineNuxtModule } from 'nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
    meta: {
        name: 'page',
    },
    async setup(options, nuxt) {
        // 给每个页面设置唯一的name
        nuxt.hook('pages:extend', (pages) => {
            const pageDir = nuxt.options.srcDir + '/pages/'
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
    },
})
