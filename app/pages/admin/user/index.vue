<template>
    <el-card
        shadow="never"
        class="v-gap"
    >
        <el-form inline>
            <el-space
                wrap
                :fill="$device.isMobile"
                size="large"
            >
                <el-form-item label="Approved by">
                    <el-input
                        placeholder="Approved by"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Approved by">
                    <el-input
                        placeholder="Approved by"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Approved by">
                    <el-input
                        placeholder="Approved by"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Approved by">
                    <el-input
                        placeholder="Approved by"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select
                        placeholder="Activity zone"
                        clearable
                    >
                        <el-option
                            label="Zone one"
                            value="shanghai"
                        />
                        <el-option
                            label="Zone two"
                            value="beijing"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                    <el-date-picker
                        type="date"
                        placeholder="Pick a date"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">Query</el-button>
                </el-form-item>
            </el-space>
        </el-form>
    </el-card>
    <el-card shadow="never">
        <div class="toolbar"></div>
        <el-table
            class="v-gap"
            :data="tableData"
            border
            stripe
        >
            <el-table-column
                prop="date"
                label="Date"
            />
            <el-table-column
                prop="name"
                label="Name"
            />
            <el-table-column
                prop="address"
                label="Address"
            />
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
        />
    </el-card>
</template>

<script setup lang="ts">
definePageMeta({
    title: '用户列表',
    icon: 'ep:memo',
})
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>

<style scoped lang="scss">
.v-gap {
    margin-bottom: 10px;
}
.el-form-item {
    margin: 0;
}
</style>
