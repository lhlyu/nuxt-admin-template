<template>
    <NuxtLoadingIndicator />
    <IshtarLayout>
        <template #header-logo>
            <slot name="header-logo" />
        </template>
        <template #header-user>
            <slot name="header-user" />
        </template>
        <slot></slot>
    </IshtarLayout>
</template>
<script setup lang="ts"></script>
