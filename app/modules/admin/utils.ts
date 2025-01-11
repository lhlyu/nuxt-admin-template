import type { PageMeta } from 'nuxt/app'
import { readFileSync } from 'node:fs'
import { parse } from '@vue/compiler-sfc'

// 改进的FNV算法
export const fnvHash = (str: string): string => {
    const p = 16777619
    let hash = 2166136261

    // 计算哈希值
    for (let i = 0; i < str.length; i++) {
        hash = (hash ^ str.charCodeAt(i)) * p
    }

    // 额外的混合步骤
    hash += hash << 13
    hash ^= hash >> 7
    hash += hash << 3
    hash ^= hash >> 17
    hash += hash << 5

    // 将哈希值转换为 32 位无符号整数
    hash = hash >>> 0

    // 将整数转换为十六进制字符串
    return hash.toString(16)
}

// 获取页面的唯一名字
export const getName = (prefix: string, filePath: string): string => {
    return prefix.toUpperCase() + fnvHash(filePath)
}

// 提取页面的pageMeta信息
export const extractDefinePageMeta = (filePath: string): PageMeta => {
    const fileContent = readFileSync(filePath, 'utf-8')

    const { descriptor } = parse(fileContent)

    const scriptSetupContent = descriptor.scriptSetup?.content ?? descriptor.script?.content ?? ''

    if (!scriptSetupContent.trim().length) {
        return {}
    }

    const definePageMetaMatch = scriptSetupContent.match(/definePageMeta\(([\s\S]*?)\)/)

    try {
        if (definePageMetaMatch) {
            const obj = new Function(`return ${definePageMetaMatch[1]}`)()
            return obj as PageMeta
        }
    } catch (e) {}
    return {}
}
