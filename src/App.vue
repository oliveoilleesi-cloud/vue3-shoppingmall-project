<template>
  <!-- URL에 따라 각 컴포넌트가 렌더링되는 영역 -->
    <router-view />
</template>

<script setup>
// 필요한 로직이 있다면 여기에 작성
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