<template>
    <template
        v-for="v in menus"
        :key="v.name"
    >
        <a-sub-menu
            v-if="v.children?.length"
            :key="v.name"
        >
            <template
                #icon
                v-if="v.meta?.icon"
            >
                <Icon
                    :name="v.meta?.icon.toString()"
                    size="18px"
                ></Icon>
            </template>
            <template #title>
                {{ v.meta?.title ?? v.name }}
            </template>
            <IshtarMenuItem :menus="v.children"></IshtarMenuItem>
        </a-sub-menu>
        <a-menu-item
            v-else
            :key="v.name"
            @click="() => menuItemClick(v)"
        >
            <template
                #icon
                v-if="v.meta?.icon"
            >
                <Icon
                    :name="v.meta?.icon.toString()"
                    size="18px"
                ></Icon>
            </template>
            {{ v.meta?.title ?? v.name }}
        </a-menu-item>
    </template>
</template>

<script setup lang="ts">
import type {PropType} from 'vue'
import type {RouteRecordRaw} from 'vue-router'

const props = defineProps({
    menus: {
        type: Array as PropType<RouteRecordRaw[]>,
        default: () => [],
    },
})

const menuItemClick = (r: RouteRecordRaw) => {
    navigateTo(r)
}
</script>

<style scoped></style>
