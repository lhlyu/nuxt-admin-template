interface SiteOption {}

const useSite = defineStore('site', {
    state: (): SiteOption => {
        return {}
    },
    actions: {},
    persist: {
        storage: persistedState.localStorage,
    },
})

export default useSite
