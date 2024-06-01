<template>
    <UDashboardLayout>
        <UDashboardPanel
            :width="250"
            :resizable="{min: 200, max: 300}"
            collapsible
        >
            <UDashboardNavbar> UDashboardNavbar </UDashboardNavbar>

            <UDashboardSidebar>
                <UDashboardSidebarLinks :links="links" />
            </UDashboardSidebar>
        </UDashboardPanel>

        <slot />
    </UDashboardLayout>
</template>

<script setup lang="ts">
const links = [
    {
        label: '首页',
        icon: 'i-heroicons-home',
        children: [
            {
                label: 'General',
            },
            {
                label: 'Members',
            },
            {
                label: 'Notifications',
            },
        ],
    },
]
</script>

<style scoped></style>
