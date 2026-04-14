<template>
  <!-- URL에 따라 각 컴포넌트가 렌더링되는 영역 -->
    <Header v-if="!isFullApp"></Header>
    <router-view />
    <Footer v-if="!isFullApp"></Footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter} from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

const isFullApp = computed(() => {
  return router.currentRoute.value.meta?.isFullApp || false
})
</script>

<style>
/* 전역 스타일 예시 */
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
nav a.router-link-exact-active {
  color: #42b983; /* 활성화된 메뉴 색상 */
}
</style>