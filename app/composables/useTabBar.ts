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

    const tabs = useState('tabs', () => [
        {
            name: route.name as string,
            icon: route.meta?.icon as string | undefined,
            title: (route.meta?.title ?? route.name) as string,
            path: route.fullPath,
        },
    ])

    const active = useState('tab-active', () => route.name as string)

    onBeforeRouteUpdate((to, from) => {
        const t = setTimeout(() => {
            document.getElementById(to.fullPath)?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
            clearTimeout(t)
        }, 100)
        active.value = to.name as string
        if (tabs.value.some((item) => item.name === to.name)) {
            return
        }
        tabs.value.push({
            name: to.name as string,
            icon: to.meta?.icon as string | undefined,
            title: (to.meta?.title ?? to.name) as string,
            path: to.fullPath,
        })
    })

    const switchTab = async (path: string) => {
        await navigateTo(path)
    }

    const appConfig = useAppConfig()

    const closeTab = async (name: string) => {
        tabs.value = tabs.value.filter((item) => item.name !== name)
        if (active.value === name) {
            if (tabs.value.length > 0) {
                await switchTab(tabs.value[0].path)
                return
            }
            if (route.fullPath === appConfig.admin) {
                tabs.value = [
                    {
                        name: route.name as string,
                        icon: route.meta?.icon as string | undefined,
                        title: (route.meta?.title ?? route.name) as string,
                        path: route.fullPath,
                    },
                ]
                return
            }
            await switchTab(appConfig.admin)
        }
    }

    const closeOtherTabs = () => {
        const v = tabs.value.find((value) => value.name === active.value)
        tabs.value = v ? [v] : []
    }

    const closeLeftTabs = () => {
        const index = tabs.value.findIndex((value) => value.name === active.value)
        tabs.value = tabs.value.slice(index)
    }

    const closeRightTabs = () => {
        const index = tabs.value.findIndex((value) => value.name === active.value)
        tabs.value = tabs.value.slice(0, index + 1)
    }

    return {
        id,
        handleArrowScroll,
        tabs,
        active,
        switchTab,
        closeTab,
        closeOtherTabs,
        closeLeftTabs,
        closeRightTabs,
    }
}

export default useTabBar
