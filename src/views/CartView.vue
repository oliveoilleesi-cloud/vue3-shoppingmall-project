<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div v-if="cartStore.cartItems.length === 0" class="bg-white rounded-2xl border border-slate-200 p-10 text-center">
      <p class="text-slate-600">아직 담은 상품이 없어요.</p>
      <button type="button"
        class="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
        @click="router.push('/shop')">
        <span class="material-symbols-outlined">storefront</span>
        쇼핑하러 가기
      </button>
    </div>

    <div v-else class="mt-4 bg-white rounded-2xl shadow-lg p-4">
      <h3 class="font-bold mb-3">🛒 Cart</h3>
      <span class="text-sm text-gray-500">총 {{ cartStore.cartItems.length }}개</span>
      <div class="flex flex-row mt-4">
        <div class="flex-1 space-y-2">
          <transition-group name="list" tag="div" class="space-y-2">
            <div v-for="item in cartStore.cartItems" :key="item.product.id"
              class="flex justify-between items-center p-2 border rounded-lg">
              <label class="flex items-center gap-2">
                <input type="checkbox" class="w-4 h-4 text-primary border-gray-300 rounded" />
                <img :src="item.product.image" alt="Product Image" class="w-20 h-20 object-cover rounded mr-4" />

              </label>

              <div class="flex-1 ml-4">
                <p class="text-sm font-semibold">{{ item.product.name }}</p>
                <p class="text-xs text-gray-400">₩{{ item.product.price }}</p>
              </div>

              <button class="text-xs px-2 py-1 bg-white hover:bg-primary/10 text-white rounded "
                @click="cartStore.removeFromCart(item.product.id)">
                <img src="@/assets/icons/icon-garbage.png" alt="Remove" class="w-4 h-4" />
              </button>
            </div>
          </transition-group>
        </div>
        <!-- 총 금액 영역 start -->
        <div class="flex-1 space-y-2 sticky top-1/2 self-start">
          <div class="flex flex-col  p-2 border rounded-lg bg-yellow-50">

            <!--총 주문 금액-->
            <div class="flex-1 flex-direction: row; ml-4">

              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold">총 주문 금액</p>
                <p class="text-sm font-semibold">₩ 100,000</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">상품금액: </p>
                <p class="text-xs text-gray-400 ml-1">₩ 100,000</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">배송비: </p>
                <p class="text-xs text-gray-400 ml-1">₩ 2,500</p>
              </div>
            </div>

            <!--총 할인 금액-->
            <div class="flex-1 flex-direction: row; ml-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold">총 할인 금액</p>
                <p class="text-sm font-semibold text-orange-500">- ₩ 2,500</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">기본 할인: </p>
                <p class="text-xs text-gray-400 ml-1">- ₩ 2,500</p>
              </div>
            </div>

            <!--총 금액-->
            <div class="flex-1 flex-direction: row; ml-4">

              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold">총 금액</p>
                <p class="text-sm font-semibold">₩ 97,500</p>
              </div>
            </div>

          </div>
        </div>
        <!-- 총 금액 영역 end-->

      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const favoriteProducts = computed(() => {
  return (cartStore.cartItems || []).filter(p => p.isFavorite)
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
