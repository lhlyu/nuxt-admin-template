import { findMenu, findParents } from '#menus'
import type { MenuItem } from '#app'

const useTabBar = () => {
    const id = useId()

    // 左右滚动
    const handleArrowScroll = (prev: boolean = true) => {
        const dom = document.getElementById(id)
        if (dom) {
            const scrollWidth = dom.scrollWidth
            // 每次偏移值
            const offset = dom.clientWidth / 2
            const scrollLeft = dom.scrollLeft

            let left = prev ? scrollLeft - offset : scrollLeft + offset
            if (left <= 0) {
                left = 0
            } else if (left > scrollWidth) {
                left = scrollWidth
            }
            dom.scrollTo({ left: left, behavior: 'smooth' })
        }
    }

    const route = useRoute()

    const tabs = useState('tabs', () => [] as MenuItem[])

    const active = useState('tab-active', () => route.name as string)

    // keepalive
    const actives = useState('actives', () => [] as string[])

    watch(
        () => route,
        (to, from) => {
            const t = setTimeout(() => {
                // 将标签移到可视范围
                document?.getElementById(to.name as string)?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
                clearTimeout(t)
            }, 100)
            active.value = to.name as string
            if (tabs.value.some((item) => item.name === to.name)) {
                return
            }

            const menu = findMenu(to.name as string)

            if (!menu) {
                return
            }

            if (!actives.value.includes(menu.name)) {
                actives.value.push(menu.name)
            }

            tabs.value.push(menu)
        },
        { deep: true, immediate: true },
    )

    const switchTab = async (name: string) => {
        await navigateTo({ name: name })
    }

    // 关闭标签
    const closeTab = async (name: string) => {
        try {
            // 如果是当前已经激活的标签，则判断剩余标签元素长度是否大于1，如果大于1，则激活标签切到第一个元素
            if (name === active.value) {
                if (tabs.value.length > 1) {
                    const newTabs = tabs.value.filter((value) => value.name !== name)

                    // 这里一定要先切换标签，再关闭，否则keepalive会失效
                    await switchTab(newTabs[0].name)
                    await nextTick(() => {
                        tabs.value = newTabs
                        actives.value = newTabs.map((value) => value.name)
                    })
                }
                return
            }
            tabs.value = tabs.value.filter((value) => value.name !== name)
            actives.value = actives.value.filter((value) => value !== name)
        } catch (e) {
            console.error(e)
        }
    }

    // 关闭其他标签
    const closeOtherTabs = () => {
        const otherTabNames = tabs.value.filter((value) => value.name !== active.value).map((value) => value.name)
        tabs.value = tabs.value.filter((value) => value.name === active.value)
        actives.value = actives.value.filter((value) => !otherTabNames.includes(value))
    }

    // 关闭左边标签
    const closeLeftTabs = () => {
        const activeIndex = tabs.value.findIndex((tab) => tab.name === active.value)
        const leftTabNames = tabs.value.filter((value, index) => index < activeIndex).map((value) => value.name)

        tabs.value = tabs.value.slice(activeIndex, tabs.value.length)
        actives.value = actives.value.filter((value) => !leftTabNames.includes(value))
    }

    // 关闭右边标签
    const closeRightTabs = () => {
        const activeIndex = tabs.value.findIndex((tab) => tab.name === active.value)
        const rightTabNames = tabs.value.filter((value, index) => index > activeIndex).map((value) => value.name)

        tabs.value = tabs.value.slice(0, activeIndex + 1)
        actives.value = actives.value.filter((value) => !rightTabNames.includes(value))
    }

    return {
        id,
        handleArrowScroll,
        tabs,
        active,
        actives,
        switchTab,
        closeTab,
        closeOtherTabs,
        closeLeftTabs,
        closeRightTabs,
    }
}

export default useTabBar
