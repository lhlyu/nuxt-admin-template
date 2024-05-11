// 尺寸
// >=1536px Large
// >=768px Medium
// other Small

const largeSize = 1400
const mediumSize = 768
const defaultCollapsedWidth = 50

// admin布局
const useIshtarLayout = () => {
    const sider = ref({
        defaultCollapsed: false,
        collapsed: false,
        collapsedWidth: defaultCollapsedWidth,
        collapseClass: '',
        init: true,
    })

    const onCollapsed = () => {
        sider.value.collapsed = !sider.value.collapsed
    }

    // 根据屏幕宽度确定布局方式
    const onResize = useDebounceFn(() => {
        const width = window.innerWidth
        let defaultCollapsed = false
        let collapsedWidth = defaultCollapsedWidth
        let collapseClass = ''
        if (width >= largeSize) {
        } else if (width >= mediumSize) {
            defaultCollapsed = true
        } else {
            defaultCollapsed = true
            collapsedWidth = 0
            collapseClass = 'mobile-layout-sider'
        }
        const collapsed = sider.value.init ? defaultCollapsed : sider.value.collapsed
        sider.value = {
            defaultCollapsed: defaultCollapsed,
            collapsed: collapsed,
            collapsedWidth: collapsedWidth,
            collapseClass: collapseClass,
            init: false,
        }
    }, 250)

    onBeforeMount(async () => {
        await onResize()
        window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize)
    })


    return {
        sider,
        onCollapsed,
    }
}

export default useIshtarLayout
