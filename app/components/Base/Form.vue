<template>

</template>

<script setup lang="ts">
import type { FormItemRule } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils'

interface FormItemOption {
    prop: string | string[]
    label: string
    placeholder: string
    required: boolean
    rules: Arrayable<FormItemRule>
}
</script>

<style scoped>

</style>