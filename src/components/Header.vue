<template>
    <!-- Top Navigation -->
    <div class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-12">
            <div class="flex items-center gap-2 text-primary">
              <span class="material-symbols-outlined text-4xl">diamond</span>
              <h2 class="text-2xl font-extrabold tracking-tighter">LUXE</h2>
            </div>
            <nav class="hidden md:flex items-center gap-8">
                <router-link
            v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="text-sm font-semibold transition-colors hover:text-primary"
                :class="{ 'text-primary': isActive(item.path) }"
                >
                {{ item.name }}
                </router-link>
            </nav>
          </div>
          <div class="flex-1 max-w-md px-8 hidden lg:block">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <span class="material-symbols-outlined">search</span>
              </span>
              <input
                v-model="searchQuery"
                class="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400"
                placeholder="Search essentials..."
                type="text"
              />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button class="p-2 hover:bg-primary/10 rounded-lg transition-colors relative">
              <span class="material-symbols-outlined">shopping_bag</span>
              <span class="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button class="p-2 hover:bg-primary/10 rounded-lg transition-colors">
              <span class="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const searchQuery = ref('')

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' }
]

const isActive = (path) => {
  return window.location.pathname === path
}
</script>


<style scoped>
/* Local Font-Face Declarations */
@font-face {
  font-family: 'Manrope';
  src: url('../assets/fonts/manrope-variable.woff2') format('woff2-variations');
  font-weight: 300 800;
  font-display: swap;
}

@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  src: url('../assets/fonts/material-symbols-outlined.woff2') format('woff2');
}

body {
  font-family: 'Manrope', sans-serif;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>