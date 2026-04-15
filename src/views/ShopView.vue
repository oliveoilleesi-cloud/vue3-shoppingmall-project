<template>
  <div class="relative flex min-h-screen w-full flex-col">


    <div class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Header -->
      <div class="mb-12">
        <h1 class="text-5xl font-extrabold tracking-tight mb-4">All Products</h1>
        <p class="text-slate-500 max-w-2xl text-lg">
          Discover our curated collection of premium essentials designed to elevate your daily lifestyle with unmatched quality and minimal aesthetic.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 space-y-8">
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Categories</h3>
            <ul class="space-y-3">
              <li v-for="category in categories" :key="category.name">
                <a
                  class="text-sm flex justify-between items-center group cursor-pointer"
                  @click="selectCategory(category.name)"
                >
                  <span
                    :class="{
                      'text-primary font-medium': activeCategory === category.name,
                      'text-slate-500 hover:text-primary': activeCategory !== category.name
                    }"
                  >
                    {{ category.name }}
                  </span>
                  <span
                    class="text-xs px-2 py-0.5 rounded"
                    :class="{
                      'bg-primary/10 text-primary': activeCategory === category.name,
                      'text-slate-400': activeCategory !== category.name
                    }"
                  >
                    {{ category.count }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Price Range</h3>
            <div class="px-2">
              <input
                v-model.number="priceRange"
                class="w-full h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                max="1000"
                min="0"
                type="range"
              />
              <div class="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                <span>$0</span>
                <span>$1,000+</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider mb-4">Sort By</h3>
            <div class="space-y-2">
              <label
                v-for="option in sortOptions"
                :key="option.value"
                class="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  v-model="sortBy"
                  :value="option.value"
                  name="sort"
                  type="radio"
                />
                <span class="text-sm text-slate-600 group-hover:text-primary transition-colors">
                  {{ option.label }}
                </span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              :isDraggable="true"
              :onClick="handleProductClick"
              @clickFavorite="toggleFavorite"
            />
          </div>
          <!-- Pagination -->
          <div class="mt-16 flex flex-col items-center gap-6">
            <button
              :disabled="loading"
              @click="loadMore"
              class="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {{ loading ? 'Loading...' : 'Load More Products' }}
            </button>
              <p class="text-sm text-slate-400">
              Showing {{ filteredProducts.length }} of 48 products
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <DragDropZone :items="cartItems" :onDrop="handleDrop" @remove="handleRemove" /> -->
    <!-- <Cart :items="cartItems" @drop="handleDrop" @remove="item => cartItems = cartItems.filter(i => i.id !== item.id)" /> -->
    </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'
import DragDropZone from '../components/DragDropZone.vue'

const router = useRouter()
const productStore = useProductStore()

const activeCategory = ref('All Products')
const priceRange = ref(1000)
const sortBy = ref('newest')
const loading = ref(false)
const cartItems = ref([])

const categories = ref([
  { name: 'All Products', count: '48' },
  { name: 'Home Essentials', count: '12' },
  { name: 'Personal Care', count: '08' },
  { name: 'Travel Gear', count: '15' },
  { name: 'Tech Accessories', count: '13' }
])

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' }
]

const filteredProducts = computed(() => {
  let result = [...productStore.products]

  // 1. 카테고리 필터링
  result = filteredByCategory.value
  // 2. 이름 검색 필터링
  result = filteredByName(result)

  // 3. 가격 범위 필터링
  result = result.filter(p => p.price <= priceRange.value)
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    default:
      result.sort((a, b) => b.id - a.id)
  }
  return result
})

const filteredByCategory = computed(() => {

  console.log('Filtering by category:', activeCategory.value)
  if (activeCategory.value === 'All Products') return productStore.products
  return productStore.products.filter(p => p.category === activeCategory.value)
})

const filteredByName = (products) => {
  if (!productStore.hasSearchName) return products
  return products.filter(p => p.name.toLowerCase().includes(productStore.searchName.toLowerCase()))
}

const handleDrop = async (items) => {
  const idsToRemove = new Set(items.map(i => i.id))

  for (const item of items) {
    if (!cartItems.value.find(i => i.id === item.id)) {
      cartItems.value.push(item)
    }
  }

  productStore.setProducts(productStore.products.filter(p => !idsToRemove.has(p.id)))
}

const handleProductClick = (product) => {
  console.log('Product clicked:', product)
  
  productStore.setProduct(product)
  router.push({
    path:  `/product/${product.id}`
  })
}

const selectCategory = (category) => {
  activeCategory.value = category
}

const loadMore = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}

const handleRemove = (item) => {
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)
  productStore.setProducts([...productStore.products, item])
}

const toggleFavorite = (product) => {
  // ProductCard에서 넘어온 product 기준으로 store.products에서 찾아 favorite 토글 적용
  const found = productStore.products.find(p => p.id === product.id)
  if (!found) return

  found.isFavorite = !found.isFavorite

  // 현재 상세로 선택된 상품이 같은 경우도 동기화
  if (productStore.product?.id === found.id) {
    productStore.product.isFavorite = found.isFavorite
  }
}
</script>