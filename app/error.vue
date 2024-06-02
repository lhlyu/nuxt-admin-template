<template>
    <Title>{{ error?.statusCode }}</Title>
    <main>
        <el-result
            icon="error"
            :title="error?.statusCode + ''"
            :sub-title="error?.message"
        >
            <template #extra>
                <el-button
                    type="primary"
                    tag="a"
                    :href="appConfig.login"
                    rel="noopener noreferrer"
                    >返回</el-button
                >
            </template>
        </el-result>
    </main>
</template>
<script setup lang="ts">
import type {NuxtError} from '#app'

defineProps({
    error: Object as () => NuxtError,
})

const appConfig = useAppConfig()
</script>

<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: var(--el-bg-color-page);
}
</style>
