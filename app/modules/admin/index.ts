import { parse } from '@vue/compiler-sfc'
import { createResolver, defineNuxtModule, addTemplate, addTypeTemplate, updateTemplates } from 'nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import { getName, extractDefinePageMeta } from '~/modules/admin/utils'
import generateMenus, { menusDeclare } from '~/modules/admin/menus'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
    meta: {
        name: 'admin',
        configKey: 'admin-key',
        compatibility: {
            nuxt: '>=3.0.0',
        },
    },
    async setup(options, nuxt) {
        // 页面所在的目录
        const pageDir = `${nuxt.options.srcDir}/${nuxt.options.dir.pages}/`

        let ps: NuxtPage[] = []

        nuxt.options.alias['#menus'] = addTemplate({
            filename: 'menus.mjs',
            getContents: () => generateMenus(pageDir, ps),
            write: true,
        }).dst

        addTypeTemplate({
            filename: 'menus.d.ts',
            getContents: () => menusDeclare,
            write: true,
        })

        // 给每个页面设置唯一的name
        nuxt.hook('pages:extend', async (pages) => {

            function setName(items: NuxtPage[]) {
                for (const page of items) {
                    page.name = getName('p', page.file!.slice(pageDir.length))

                    const pm = extractDefinePageMeta(page.file!)

                    page.meta = Object.assign(
                        {
                            title: page.name,
                            hidden: false,
                            order: 0,
                            role: [],
                        },
                        pm,
                    )

                    if (page.children) {
                        setName(page.children)
                        continue
                    }
                }
            }

            setName(pages)

            ps = pages

            await updateTemplates({
                filter: template => {
                    console.log(template.filename)
                    return template.filename === 'menus.mjs'
                }
            })


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
                            const name = getName('p', id.slice(pageDir.length))

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
