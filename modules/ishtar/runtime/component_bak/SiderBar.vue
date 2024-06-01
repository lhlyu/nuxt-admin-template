<template>
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        accordion
    >
        <IshtarMenuItem :menus="menus"></IshtarMenuItem>
    </a-menu>
</template>

<script setup lang="ts">
import type {RouteRecordRaw} from 'vue-router'

const router = useRouter()
const route = useRoute()

const menus = ref<RouteRecordRaw[]>(router.options.routes.find((value) => value.path === '/admin')?.children ?? [])
const selectedKeys = ref<unknown[]>([route.name])
const openKeys = ref<unknown[]>([])

const findTopMenuName = () => {
    const oKeys: unknown[] = []
    route.matched.forEach((ele) => {
        if (ele.name && ele.children.length) {
            oKeys.push(ele.name)
        }
    })
    openKeys.value = oKeys
}

watch(
    () => route.path,
    (value, oldValue) => {
        findTopMenuName()
    },
)

findTopMenuName()
</script>

<style scoped></style>
