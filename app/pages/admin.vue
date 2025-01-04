<template>
    <NuxtLayout name="admin">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
<script lang="ts" setup>
onBeforeMount(() => {
    console.log('✅装载:管理')
})

onBeforeUnmount(() => {
    console.log('❌卸载:管理')
})
</script>
