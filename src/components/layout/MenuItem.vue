<template>

</template>

<script setup lang="ts">
import type {PropType} from 'vue'
import type {RouteRecordRaw} from 'vue-router'

const props = defineProps({
    menus: {
        type: Array as PropType<RouteRecordRaw[]>,
        default: () => []
    }
})

</script>

<style scoped></style>
