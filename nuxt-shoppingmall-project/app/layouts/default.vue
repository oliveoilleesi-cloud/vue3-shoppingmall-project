<template>
    <div class="min-h-screen flex flex-col">
        <Header>
            <slot name="header" />
        </Header>
        <main class="flex-grow">
            <slot />
        </main>
        <Footer>
            <slot name="footer" />
        </Footer>
    </div>
</template>
<script lang="ts" setup>
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
</script>