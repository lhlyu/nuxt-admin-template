<template>
    <section :class="{ fit: device.isMobile }" v-loading="pending">
        <el-card shadow="never">
            <el-form inline :model="query">
                <el-space wrap :fill="device.isMobile" size="large">
                    <el-form-item label="名字">
                        <el-input clearable style="width: 200px" v-model="query.name" />
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select style="width: 200px" v-model="query.gender">
                            <el-option label="全部" :value="0" />
                            <el-option label="男" :value="1" />
                            <el-option label="女" :value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-space>
            </el-form>
        </el-card>
        <el-card shadow="never">
            <div class="toolbar v-gap">
                <el-space>
                    <el-button type="primary" :icon="Plus">新增</el-button>
                    <el-button type="danger" :icon="Delete">删除</el-button>
                </el-space>
                <el-button-group class="ml-4">
                    <el-button :icon="Search" />
                    <el-button :icon="Refresh" />
                </el-button-group>
            </div>
            <el-table class="v-gap" :data="data?.data?.list" border stripe>
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="name" label="名字" />
                <el-table-column prop="gender" label="性别">
                    <template #default="scope">
                        {{ scope.row.gender === 1 ? '男' : '女' }}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="data?.data?.page?.total ?? 0"
                v-model:page-size="query.size"
                v-model:current-page="query.current"
                @change="pageChange"
            />
        </el-card>
    </section>
</template>

<script setup lang="ts">
import { Plus, Delete, Search, Refresh } from '@element-plus/icons-vue'

definePageMeta({
    title: '用户列表',
    icon: 'ep:memo',
})

onBeforeMount(() => {
    console.log('✅装载:用户列表')
})

onBeforeUnmount(() => {
    console.log('❌卸载:用户列表')
})

const device = useDevice()

const query = reactive({
    current: 1,
    size: 10,
    name: '',
    gender: 0,
})

const { data, execute, pending, error, refresh } = await useFetch('/api/user/search', {
    query: query,
    immediate: false,
    watch: false,
})

onBeforeMount(async () => {
    await refresh()
})

const search = async () => {
    if (query.current > 1) {
        query.current = 1
        return
    }
    await refresh()
}

const pageChange = async () => {
    await refresh()
}
</script>

<style scoped lang="scss">
.v-gap {
    margin-bottom: 10px;
}
.el-card:not(:last-child) {
    margin-bottom: 10px;
}
.el-form-item {
    margin: 0;
}
.el-pagination {
    justify-content: center;
}
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.fit {
    width: fit-content;
}
</style>
