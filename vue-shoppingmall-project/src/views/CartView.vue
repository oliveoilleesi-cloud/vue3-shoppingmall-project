<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center gap-3">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">🛒 Cart</h1>
          <p class="text-sm text-slate-500">내가 담은 상품을 모아봤어요</p>
        </div>
      </div>
    <div v-if="cartStore.cartItems.length === 0" class="bg-white rounded-2xl border border-slate-200 p-10 text-center">
      <p class="text-slate-600">아직 담은 상품이 없어요.</p>
      <button type="button"
        class="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
        @click="router.push('/shop')">
        <span class="material-symbols-outlined">storefront</span>
        쇼핑하러 가기
      </button>
    </div>
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
                <p class="text-sm text-gray-400">수량: {{ item.quantity }}</p>
                <p class="text-sm text-orange-400">{{ item.product.discountRate.toLocaleString() }}%</p>
                <p class="text-xs font-semibold text-gray-400">₩{{ calculateDiscountedPrice(item.product.price, item.product.discountRate).toLocaleString() }}</p>
                <p class="text-sm text-slate-400 line-through">₩{{ item.product.price.toLocaleString() }}</p>
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
                <p class="text-sm font-semibold">₩ {{ orderTotalPrice.toLocaleString() }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">상품금액: </p>
                <p class="text-xs text-gray-400 ml-1">₩ {{ totalOriginalPrice.toLocaleString() }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">배송비: </p>
                <p class="text-xs text-gray-400 ml-1">₩ {{ deleveryFee.toLocaleString() }}</p>
              </div>
            </div>
            &nbsp;
            <!--총 할인 금액-->
            <div class="flex-1 flex-direction: row; ml-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold">총 할인 금액</p>
                <p class="text-sm font-semibold text-orange-500">- ₩ {{ totalDiscountAmount.toLocaleString() }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-xs text-gray-400">기본 할인: </p>
                <p class="text-xs text-gray-400 ml-1">- ₩ {{ totalDiscountAmount.toLocaleString() }}</p>
              </div>
            </div>
            &nbsp;
            <!--총 금액-->
            <div class="flex-1 flex-direction: row; ml-4">

              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold">총 금액</p>
                <p class="text-sm font-semibold">₩ {{ totalPrice.toLocaleString() }}</p>
              </div>
            </div>

          </div>
        </div>
        <!-- 총 금액 영역 end-->
  </div>
  </div>  
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { calculateDiscountedPrice } from '@/utils/caculate'

const router = useRouter()
const cartStore = useCartStore()

const orderTotalPrice = computed(() => {
  return totalOriginalPrice.value + deleveryFee.value
})

const totalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discountRate)
    return total + (discountedPrice * item.quantity)
  }, 0) + deleveryFee.value
})

const totalOriginalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

const deleveryFee = computed(() => {
  return cartStore.cartItems.length > 0 ? 2500 : 0
})
const totalDiscountAmount = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    var discountAmount = (item.product.price * (item.product.discountRate/100)).toFixed(2)
    return total + (discountAmount * item.quantity)
  }, 0)
})

</script>
