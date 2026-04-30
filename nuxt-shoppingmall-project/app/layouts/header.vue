<template>
  <!-- Top Navigation -->
  <div
    class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mobile: top bar (hamburger -> left drawer) -->
      <div class="flex items-center justify-between h-16 md:hidden">
        <button
          type="button"
          aria-label="open menu"
          class="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          @click="toggleMobileMenu"
        >
          <img src="@/assets/icons/icon-menu.png" class="w-6 h-6" />
        </button>

        <div class="flex items-center gap-2 text-primary select-none" @click="router.push('/')"  >
          <span class="material-symbols-outlined text-3xl">App</span>
          <h2 class="text-xl font-extrabold tracking-tighter">MALL</h2>
        </div>

        <div class="flex items-center gap-1">
          <!-- Favorite (icon only on mobile) -->
          <button
            type="button"
            aria-label="favorite"
            class="relative p-2 text-slate-700 rounded-lg hover:bg-primary/10 transition-colors"
            @click="router.push('/favorite')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61c-1.54-1.34-3.77-1.34-5.31 0L12 8.09 8.47 4.61c-1.54-1.34-3.77-1.34-5.31 0-1.78 1.55-1.88 4.31-.33 5.86L12 21l9.01-10.53c1.55-1.55 1.45-4.31-.17-5.86z"
              />
            </svg>
            <span
              v-if="favoritesCount"
              class="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[11px] font-bold"
            >
              {{ favoritesCount }}
            </span>
          </button>
          <!-- Cart (icon only on mobile) -->
          <button
            type="button"
            aria-label="cart"
            class="flex text-slate-700 items-center justify-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
            @click="router.push('/cart')"
          >
            <!-- 아이콘 + 뱃지 wrapper -->
            <div class="relative">
              <img src="@/assets/icons/icon-shopping-cart.png" class="w-6 h-6" />

              <span
                v-if="cartsCount"
                class="absolute -top-3 -right-3 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[11px] font-bold"
              >
                {{ cartsCount }}
              </span>
            </div>
          </button>

          <!-- Login (icon only on mobile) -->
          <button
            type="button"
            aria-label="login"
            class="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            @click="handleLogin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 text-slate-900"
              aria-hidden="true"
            >
              <path d="M14 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
              <path d="M9 12h12" />
              <path d="M16 8l5 4-5 4" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Desktop: original header layout -->
      <div class="hidden md:flex md:items-center md:justify-between md:h-20">
        <div class="flex items-center gap-12">
          <div class="flex items-center gap-2 text-primary select-none">
            <span class="material-symbols-outlined text-4xl">App</span>
            <h2 class="text-2xl font-extrabold tracking-tighter">MALL</h2>
          </div>

          <nav class="flex items-center gap-8">
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

        <div class="flex-1 max-w-md px-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              class="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400"
              placeholder="Search product name..."
              type="text"
            />
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Favorite -->
          <button
            type="button"
            aria-label="favorite"
            class="flex items-center text-slate-700 justify-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
            @click="router.push('/favorite')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61c-1.54-1.34-3.77-1.34-5.31 0L12 8.09 8.47 4.61c-1.54-1.34-3.77-1.34-5.31 0-1.78 1.55-1.88 4.31-.33 5.86L12 21l9.01-10.53c1.55-1.55 1.45-4.31-.17-5.86z"
              />
            </svg>

            <span class="text-sm text-slate-500">My favorites</span>
            <span
              v-if="favoritesCount"
              class="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[11px] font-bold"
            >
              {{ favoritesCount }}
            </span>
          </button>
          <!-- Cart -->
          <button
            type="button"
            aria-label="cart"
            class="flex items-center justify-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
            :class="cartsCount > 0 ? 'text-orange-500' : 'text-slate-700'"
            @click="router.push('/cart')"
          >
            <img src="@/assets/icons/icon-shopping-cart.png" class="w-6 h-6" />

            <span class="text-sm text-slate-500">Cart</span>
            <span
              v-if="cartsCount"
              class="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[11px] font-bold"
            >
              {{ cartsCount }}
            </span>
          </button>

          <!-- Login -->
          <div>
            <button
              v-if="userStore.accessToken === null"
              type="button"
              class="flex items-center justify-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors"
              @click="handleLogin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6 text-slate-900"
                aria-hidden="true"
              >
                <path d="M14 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                <path d="M9 12h12" />
                <path d="M16 8l5 4-5 4" />
              </svg>

              <span class="text-sm text-slate-500">Login</span>
            </button>

            <!-- logout -->
            <button
              v-else
              type="button"
              class="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
              @click="handleLogout"  
            >
              <img src="@/assets/icons/icon-profile.png" class="w-6 h-6" />
              <span class="text-sm text-slate-700">Logout</span>
            </button>
          </div>
          </div>

      </div>
    </div>

    <!-- Mobile: dropdown menu (pushes page down) -->
    <transition name="mobile-menu">
      <div v-show="isMobileMenuOpen" class="md:hidden bg-white border-t border-primary/10">
        <div class="px-4 py-4 flex flex-col gap-4">
          <nav class="flex flex-col gap-2">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/10"
              :class="{ 'text-primary bg-primary/5': isActive(item.path) }"
              @click="closeMobileMenu"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <div class="relative">
            <input
              v-model="searchQuery"
              class="block w-full pl-10 pr-3 py-2 border-none bg-primary/5 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400"
              placeholder="Search product name..."
              type="text"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup ts>
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore' 
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const productStore = useProductStore()
const favoritesCount = computed(() => {
  return (productStore.products || []).filter((p) => p.isFavorite).length
})
const cartsCount = computed(() => {
  return (cartStore.cartItems || []).length
})

const isLogin = computed(() => {
  console.log('userStore.hasAuthenticated:', userStore.hasAuthenticated)
  return userStore.hasAuthenticated
})

watch(searchQuery, (newQuery) => {
  // Implement search logic here, e.g., filter products in the store
  console.log('Search query:', newQuery)
  productStore.setSearchName(newQuery)
})

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    // close drawer on route change
    closeMobileMenu()
  }
)

const navItems = [{ name: 'Home', path: '/' }]

const isActive = (path) => {
  return route.path === path
}

const handleLogin = () => {
  router.push('/login')
}
const handleLogout = () => {
  router.push('/')
  userStore.logout()
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

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  overflow: hidden;
  transition: max-height 180ms ease, opacity 180ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  max-height: 0;
  opacity: 0;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  max-height: 420px;
  opacity: 1;
}

</style>