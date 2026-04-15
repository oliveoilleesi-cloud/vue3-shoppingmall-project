<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-8">
      <div class="flex items-center gap-3">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">Favorites</h1>
          <p class="text-sm text-slate-500">내가 찜한 상품을 모아봤어요</p>
        </div>
      </div>
    </div>

    <div v-if="favoriteProducts.length === 0" class="bg-white rounded-2xl border border-slate-200 p-10 text-center">
      <p class="text-slate-600">아직 찜한 상품이 없어요.</p>
      <button
        type="button"
        class="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
        @click="router.push('/shop')"
      >
        <span class="material-symbols-outlined">storefront</span>
        쇼핑하러 가기
      </button>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in favoriteProducts"
        :key="product.id"
        :product="product"
        :onClick="handleProductClick"
        @clickFavorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const router = useRouter()
const productStore = useProductStore()

const favoriteProducts = computed(() => {
  return (productStore.products || []).filter(p => p.isFavorite)
})

const handleProductClick = (product) => {
  router.push(`/product/${product.id}`)
}

const toggleFavorite = (product) => {
  const found = productStore.products.find(p => p.id === product.id)
  if (!found) return
  found.isFavorite = !found.isFavorite
}
</script>
