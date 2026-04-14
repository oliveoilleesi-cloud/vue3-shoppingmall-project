<template>
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Product Image -->
        <div class="md:w-1/2">
          <div class="aspect-square bg-slate-100 rounded-xl overflow-hidden">
            <img 
              :src="productStore.product?.image" 
              :alt="productStore.product?.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="md:w-1/2 p-6">
          <h1 class="text-2xl font-bold text-slate-900 mb-2">{{ productStore.product?.name }}</h1>
          
          <div class="flex items-center gap-1 mb-4">
            <span class="material-symbols-outlined text-[16px] text-primary fill-1">star</span>
            <span class="text-sm font-medium text-slate-500">{{ productStore.product?.rating }} ({{ productStore.product?.reviews }} reviews)</span>
          </div>

          <div class="mb-6">
            <p class="text-sm text-slate-500 mb-2">정상 가격</p>
            <p class="text-3xl font-bold text-primary">${{ productStore.product?.price?.toLocaleString() }}</p>
          </div>

          <div class="mb-4">
            <p class="text-sm font-medium text-slate-700 mb-2">구매 금액 선택</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="price in purchasePrices"
                :key="price"
                @click="selectedPrice = price"
                :class="[
                  'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                  selectedPrice === price
                    ? 'border-primary bg-primary text-white'
                    : 'border-slate-200 hover:border-primary text-slate-700'
                ]"
              >
                {{ formatPrice(price) }}
              </button>
            </div>
          </div>

          <!-- Purchase Quantity -->
          <div class="mb-6">
            <p class="text-sm font-medium text-slate-700 mb-2">구매 수량</p>
            <div class="flex items-center gap-4">
              <button
                @click="decreaseQuantity"
                class="w-10 h-10 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-primary transition-colors"
              >
                <span class="material-symbols-outlined">-</span>
              </button>
              <input
                type="number"
                v-model.number="quantity"
                min="1"
                max="99"
                class="w-16 h-10 text-center border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none"
              />
              <button
                @click="increaseQuantity"
                class="w-10 h-10 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-primary transition-colors"
              >
                <span class="material-symbols-outlined">+</span>
              </button>
            </div>
          </div>

          <!-- Total Amount -->
          <div class="bg-slate-50 rounded-xl p-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium text-slate-700">합계 금액</span>
              <span class="text-2xl font-bold text-primary">{{ formatPrice(totalAmount) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="addToCart"
              class="flex-1 py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">장바구니</span>
              
            </button>
            <button
              @click="placeOrder"
              class="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">주문하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  console.log('Product in store on mount:', productStore.product)
})
const purchasePrices = ref([5000, 10000, 15000, 20000])
const selectedPrice = ref(purchasePrices.value[0])
const quantity = ref(1)

const totalAmount = computed(() => {
  return selectedPrice.value * quantity.value
})

const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
    .format(price)
    .replace('KRW', '원')
}

const addToCart = () => {
  const cartItem = {
    product: productStore.product,
    selectedPrice: selectedPrice.value,
    quantity: quantity.value
  }
  console.log('장바구니 추가:', cartItem)
  alert(`${productStore.product.name}을(를) 장바구니에 담았습니다!`)
}

const placeOrder = () => {
  const orderItem = {
    product: productStore.product,
    selectedPrice: selectedPrice.value,
    quantity: quantity.value,
    totalAmount: totalAmount.value
  }
  console.log('주문하기:', orderItem)
  alert(`${formatPrice(totalAmount.value)} 주문이 완료되었습니다!`)
}
</script>

<style scoped>
:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

button:hover span.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

</style>