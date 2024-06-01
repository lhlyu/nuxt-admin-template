<script setup>
import {ref} from 'vue'

const show = ref(true)
</script>

<template>
    <main>
        <button @click="show = !show">切换</button>
        <Transition name="nested">
            <div
                v-show="show"
                class="outer"
            >
                div
            </div>
        </Transition>
        <Transition name="nested">
            <aside v-show="show">aside</aside>
        </Transition>
    </main>
</template>

<style>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.outer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100px;
    margin-top: 20px;
    overflow: hidden;
    background: #eee !important;
}
aside {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100px;
    margin-top: 20px;
    overflow: hidden;
    background: lightcoral !important;
    border: none !important;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.5s ease;
}

.nested-enter-from,
.nested-leave-to {
    width: 0;
}
.nested-enter-to,
.nested-leave-from {
    width: 300px;
}
</style>
