<template>
    <a-breadcrumb :max-count="5">
        <a-breadcrumb-item
            v-for="v in $route.matched"
            :key="v.name"
        >
            <a-space size="mini">
                <Icon
                    v-if="v.meta?.icon"
                    size="16px"
                    :name="v.meta.icon.toString()"
                ></Icon>
                <span>{{ v.meta?.title ?? '' }}</span>
            </a-space>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script setup lang="ts"></script>

<style scoped>
.arco-breadcrumb {
    user-select: none;
}
</style>
