<template>
    <a-dropdown trigger="hover" @select="selectHandler">
        <a-space
            size="mini"
            class="header-user"
        >
            <a-avatar :size="20">
                <img
                    src="/logo.png"
                    alt="avatar"
                    width="20"
                />
            </a-avatar>
            <span>管理员</span>
        </a-space>
        <template #content>
            <a-doption value="setting">
                <template #icon>
                    <Icon name="ri:settings-3-line"></Icon>
                </template>
                设置
            </a-doption>
            <a-doption value="exit">
                <template #icon>
                    <Icon name="ri:logout-circle-r-line"></Icon>
                </template>
                退出
            </a-doption>
        </template>
    </a-dropdown>
</template>

<script setup lang="ts">
const router = useRouter()

const selectHandler = (val: string) => {
    console.log('val:', val)
    switch (val) {
        case 'exit':
            router.push('/')
    }
}
</script>

<style lang="scss" scoped>
.header-user {
    cursor: pointer;
    user-select: none;
    
    img {
        border-radius: 50%;
    }
}
</style>
