export default defineNuxtPlugin({
    name: 'body',
    setup() {},
    hooks: {
        'app:beforeMount'() {
            const onResize = () => {
                document.body.style.height = `${window.innerHeight}px`
            }
            onResize()
            window.addEventListener('resize', onResize)
        },
    },
})
