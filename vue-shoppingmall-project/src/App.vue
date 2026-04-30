<template>
  <!-- URL에 따라 각 컴포넌트가 렌더링되는 영역 -->
    <Header v-if="!isFullApp"></Header>
    <router-view />
    <Footer v-if="!isFullApp"></Footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter} from 'vue-router'
import Header from '@/components/layouts/Header.vue'
import Footer from '@/components/layouts/Footer.vue'

const router = useRouter()

const isFullApp = computed(() => {
  return router.currentRoute.value.meta?.isFullApp || false
})
</script>
