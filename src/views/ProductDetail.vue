<template>
  <div class="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-12 flex items-start md:items-center justify-center">
    <div class="w-full">
      <div class="flex flex-col md:flex-row">
        <!-- Product Image -->
        <div class="md:w-1/2">
          <div class="relative aspect-square bg-slate-100 rounded-xl overflow-hidden">
            <img
              :src="activeImage"
              :alt="productStore.product?.name"
              class="w-full h-full object-cover"
            />

            <!-- Slider Controls -->
            <button
              type="button"
              aria-label="previous image"
              class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur shadow hover:bg-white/30 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              :disabled="galleryImages.length <= 1"
              @click.stop="prevImage"
            >
              <img src="@/assets/icons/icon-arrow-left.png" alt="Previous" class="w-4 h-4">
            </button>
            <button
              type="button"
              aria-label="next image"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur shadow hover:bg-white/30 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
              :disabled="galleryImages.length <= 1"
              @click.stop="nextImage"
            >
              <img src="@/assets/icons/icon-arrow-right.png" alt="Next" class="w-4 h-4">
            </button>

            <!-- Like (Heart) Button -->
            <div class="absolute top-3 right-3 z-10">
              <button
                class="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-sm"
                :class="productStore.product?.isFavorite ? 'text-orange-500' : 'text-slate-700'"
                type="button"
                aria-label="like"
                @click.stop="toggleFavorite"
              >
                <svg
                  v-if="productStore.product?.isFavorite"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20.84 4.61c-1.54-1.34-3.77-1.34-5.31 0L12 8.09 8.47 4.61c-1.54-1.34-3.77-1.34-5.31 0-1.78 1.55-1.88 4.31-.33 5.86L12 21l9.01-10.53c1.55-1.55 1.45-4.31-.17-5.86z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Thumbnails Slider -->
          <div v-if="galleryImages.length > 1" class="mt-4">
            <div class="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              <button
                v-for="(img, idx) in galleryImages"
                :key="img + idx"
                type="button"
                class="shrink-0 snap-start rounded-lg border-2 transition-colors"
                :class="idx === activeImageIndex ? 'border-primary' : 'border-slate-200 hover:border-secondary'"
                @click="setImage(idx)"
              >
                <img
                  :src="img"
                  :alt="`${productStore.product?.name || 'product'} thumbnail ${idx + 1}`"
                  class="h-20 w-20 object-cover rounded-md"
                />
              </button>
            </div>
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
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-slate-500">가격</p>
              <span class="text-sm font-bold text-orange-500">{{ discountRate }}% 할인</span>
            </div>
            <div class="flex items-end gap-3">
              <p class="text-3xl font-bold text-primary">${{ priceValue.toLocaleString() }}</p>
              <p v-if="originalPrice" class="text-sm text-slate-400 line-through">
                ${{ originalPrice.toLocaleString() }}
              </p>
            </div>
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
                :max="MAX_QUANTITY"
                class="w-50 h-10 text-center border-2 border-slate-200 rounded-lg focus:border-primary focus:outline-none"
              />
              <button
                @click="increaseQuantity"
                class="w-10 h-10 rounded-lg border-2 border-slate-200 flex items-center justify-center hover:border-primary transition-colors"
              >
                <span class="material-symbols-outlined">+</span>
              </button>
            </div>

            <!-- Quick Add Quantity -->
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="n in [10, 20, 30, 50, 100]"
                :key="n"
                type="button"
                @click="addQuantity(n)"
                class="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary hover:text-primary transition-colors"
              >
                + {{ n }}
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
      <Modal v-if="showModal" :title="modalData.title" :message="modalData.message" :button-text="modalData.buttonText" @close="handleModalClose" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '../components/modals/Modal.vue'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const isFavorite = ref(false)
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

// Discount
const priceValue = computed(() => {
  return Number(productStore.product?.price) || 0
})

const discountRate = computed(() => {
  const rate = productStore.product?.discountRate
  if (typeof rate === 'number') return rate

  // fallback mock discount
  const id = Number(productStore.product?.id) || 0
  const table = [10, 15, 20, 25]
  return table[id % table.length]
})

const originalPrice = computed(() => {
  const price = priceValue.value
  if (!price) return null

  const original = productStore.product?.originalPrice
  if (typeof original === 'number' && original > price) return original

  const rate = discountRate.value
  if (!rate) return null

  // reverse-calc original price
  return Math.round((price / (1 - rate / 100)) * 100) / 100
})


// Image slider
const activeImageIndex = ref(0)

const galleryImages = computed(() => {
  const p = productStore.product
  if (!p) return []

  // If product data provides an images array, use it
  if (Array.isArray(p.images) && p.images.length > 0) return p.images

  // Fallback: create a small gallery using placeholders
  if (p.image) {
    const name = p.name || 'Product'
    return [
      p.image,
      `https://placehold.co/800x800?text=${encodeURIComponent(`${name} 2`)}`,
      `https://placehold.co/800x800?text=${encodeURIComponent(`${name} 3`)}`,
      `https://placehold.co/800x800?text=${encodeURIComponent(`${name} 4`)}`
    ]
  }

  return []
})

const activeImage = computed(() => {
  return galleryImages.value[activeImageIndex.value] || productStore.product?.image || ''
})

const setImage = (idx) => {
  activeImageIndex.value = idx
}

const prevImage = () => {
  if (galleryImages.value.length <= 1) return
  activeImageIndex.value =
    (activeImageIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}

const nextImage = () => {
  if (galleryImages.value.length <= 1) return
  activeImageIndex.value = (activeImageIndex.value + 1) % galleryImages.value.length
}

watch(
  () => productStore.product?.id,
  () => {
    activeImageIndex.value = 0
  }
)


onMounted(() => {
  // 상세 페이지 직접 진입/새로고침 시에도 store 에서 상품을 찾아 세팅
  const id = Number.parseInt(route.params.id, 10)
  if (!productStore.product?.id || productStore.product.id !== id) {
    productStore.loadProduct(route.params.id)
  }
})

const modalData = ref({
  title: '',
  message: '사업자 미인증 회원은 구매가 불가능합니다.아래 방법으로 사업자 인증 후 이용부탁드립니다.\n\n1. 마이페이지에서 사업자 인증 클릭\n2. 사업자 정보 입력 하여 인증 요청\n3. 가입 승인 이후 상품 구매',
  buttonText: '이동'
})

const showModal = ref(false)
const purchasePrices = ref([5000, 10000, 15000, 20000])
const selectedPrice = ref(purchasePrices.value[0])

const MAX_QUANTITY = 999
const quantity = ref(1)

const totalAmount = computed(() => {
  return selectedPrice.value * quantity.value
})

const increaseQuantity = () => {
  if (quantity.value < MAX_QUANTITY) quantity.value++
}

const addQuantity = (amount) => {
  const next = (Number(quantity.value) || 0) + amount
  quantity.value = Math.min(MAX_QUANTITY, Math.max(1, next))
}

watch(quantity, (v) => {
  const num = Number(v)
  if (!Number.isFinite(num)) {
    quantity.value = 1
    return
  }

  if (num < 1) quantity.value = 1
  if (num > MAX_QUANTITY) quantity.value = MAX_QUANTITY
})

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
  cartStore.addToCart(cartItem)
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
  // alert(`${formatPrice(totalAmount.value)} 주문이 완료되었습니다!`)
  showModal.value = true
}

const handleModalClose =() => {
  showModal.value = false   
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