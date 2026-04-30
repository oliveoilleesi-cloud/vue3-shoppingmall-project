<script setup lang="ts">
const isDark = ref(false)

useHead({
  title: 'My App',
  titleTemplate: '%s - My Amazing Site',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: computed(() => isDark.value ? 'dark' : 'light')
  },
  htmlAttrs: {
    class: 'themed-page'
  },
  script: [
    { innerHTML: 'console.log(\'Hello world\')' },
  ],
  link: [
    { rel: 'stylesheet', href: 'https://example.com/styles.css' },
  ],
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>