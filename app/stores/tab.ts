import type { MenuItem } from '#app'

interface TabOptions {
    tabs: MenuItem[]
    active: string
    actives: string[]
}

export const useTabStore = defineStore('tab', {
    state: (): TabOptions => {
        return {
            tabs: [],
            active: '',
            actives: [],
        }
    },
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage(),
    },
})
