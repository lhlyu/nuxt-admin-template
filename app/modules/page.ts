import { parse } from '@vue/compiler-sfc'
import { createResolver, defineNuxtModule } from 'nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
    meta: {
        name: 'page',
    },
    async setup(options, nuxt) {
        // 页面所在的目录
        const pageDir = nuxt.options.srcDir + '/pages/'
        const pageDirLength = pageDir.length

        // 根据页面路径提取唯一名字
        const getPageName = (pagePath: string): string => {
            const end = pagePath.length - 4
            const name = pagePath.substring(pageDirLength, end).replaceAll('/', '+')
            return name
        }

        // 给每个页面设置唯一的name
        nuxt.hook('pages:extend', (pages) => {
            function setName(items: NuxtPage[]) {
                for (const page of items) {
                    page.name = getPageName(page.file!)
                    page.meta ||= {}
                    if (page.children) {
                        setName(page.children)
                        continue
                    }
                }
            }
            setName(pages)
        })

        // 给每个页面设置唯一的组件名字
        // 通过这个唯一名字来保证keepalive的include的值不重复
        nuxt.hook('vite:extendConfig', (viteInlineConfig, { isClient }) => {
            viteInlineConfig.plugins ||= []
            viteInlineConfig.plugins.push({
                name: 'vite-page-name',
                enforce: 'pre',
                async transform(code, id) {
                    if (isClient) {
                        if (id.toString().startsWith(pageDir) && id.toString().endsWith('.vue')) {
                            const name = getPageName(id)

                            // TODO: 检查是否存在 defineOptions({ name: '...' })
                            // 如果name存在则替换，如果name属性不存在，则加上

                            const defineOptionsCode = `\ndefineOptions({name: '${name}'})\n`

                            const { descriptor } = parse(code)
                            if (!descriptor.script && !descriptor.scriptSetup) {
                                // 如果没有 script 或 script setup，则添加 script setup 并暴露 name
                                const newCode = `<script setup lang="ts">${defineOptionsCode}</script>\n${code}`
                                return {
                                    code: newCode,
                                    map: null,
                                }
                            }
                            const script = descriptor.script || descriptor.scriptSetup
                            const scriptContent = script?.content ?? ''

                            let newScriptContent = scriptContent + defineOptionsCode
                            const newCode = code.replace(scriptContent, newScriptContent)
                            return {
                                code: newCode,
                                map: null,
                            }
                        }
                    }
                },
            })
        })
    },
})
