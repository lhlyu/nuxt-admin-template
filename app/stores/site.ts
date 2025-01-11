interface SiteOptions {
    theme: 'light' | 'dark'
}

export const useSiteStore = defineStore('site', {
    state: (): SiteOptions => {
        return {
            theme: 'light',
        }
    },
    persist: {
        storage: piniaPluginPersistedstate.cookies(),
    },
})
