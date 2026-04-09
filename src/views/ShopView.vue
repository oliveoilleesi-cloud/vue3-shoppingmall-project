<template>
  <div class="relative flex min-h-screen w-full flex-col">

    <Header></Header>
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
              Showing {{ displayedProducts.length }} of 48 products
            </p>
          </div>
        </div>
      </div>
    </div>
    <DragDropZone :items="cartItems" :onDrop="handleDrop" @remove="handleRemove" />
    <!-- <Cart :items="cartItems" @drop="handleDrop" @remove="item => cartItems = cartItems.filter(i => i.id !== item.id)" /> -->

    <!-- Footer -->
    <div class="bg-white border-t border-primary/10 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 text-primary mb-6">
              <span class="material-symbols-outlined text-3xl">diamond</span>
              <h2 class="text-xl font-extrabold tracking-tighter">LUXE</h2>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">
              Crafting premium lifestyle essentials with a focus on quality, minimalism, and timeless design.
            </p>
            <div class="flex gap-4">
              <a
                v-for="icon in socialIcons"
                :key="icon"
                class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span class="material-symbols-outlined text-lg">{{ icon }}</span>
              </a>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul class="space-y-4 text-sm text-slate-500">
              <li v-for="link in shopLinks" :key="link">
                <a class="hover:text-primary transition-colors" href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
            <ul class="space-y-4 text-sm text-slate-500">
              <li v-for="link in supportLinks" :key="link">
                <a class="hover:text-primary transition-colors" href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul class="space-y-4 text-sm text-slate-500">
              <li v-for="link in extraShopLinks" :key="link">
                <a class="hover:text-primary transition-colors" href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-primary/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <a
            v-for="icon in socialIcons"
            :key="icon"
            class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            href="#"
          >
            <span class="material-symbols-outlined text-lg">{{ icon }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import Header from '../components/Header.vue'
import DragDropZone from '../components/DragDropZone.vue'

const socialIcons = ['public', 'share']
const shopLinks = ['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards']
const supportLinks = ['Shipping Info', 'Returns & Exchanges', 'Contact Us', 'FAQ']
const extraShopLinks = ['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards']

const activeCategory = ref('All Products')
const priceRange = ref(1000)
const sortBy = ref('newest')
const loading = ref(false)
const displayedProducts = ref([])
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

const products = ref([
  {
    id: 1,
    name: 'Chronos White Edition',
    price: 299.00,
    rating: 4.9,
    reviews: 124,
    image: '/images/product1.jpg',
    category: 'Tech Accessories'
  },
  {
    id: 2,
    name: 'Studio Pro Headphones',
    price: 350.00,
    rating: 4.8,
    reviews: 89,
    image: '/images/product2.jpg',
    category: 'Tech Accessories'
  },
  {
    id: 3,
    name: 'Signature Oud Candle',
    price: 65.00,
    rating: 5.0,
    reviews: 42,
    image: '/images/product3.jpg',
    category: 'Home Essentials',
    isNew: true
  },
  {
    id: 4,
    name: 'Titanium Hydra Bottle',
    price: 85.00,
    rating: 4.7,
    reviews: 215,
    image: '/images/product4.jpg',
    category: 'Personal Care'
  },
  {
    id: 5,
    name: 'Apex Pro Tablet Sleeve',
    price: 120.00,
    rating: 4.9,
    reviews: 56,
    image: '/images/product5.jpg',
    category: 'Tech Accessories'
  },
  {
    id: 6,
    name: 'Nomad Weekend Bag',
    price: 450.00,
    rating: 4.8,
    reviews: 102,
    image: '/images/product6.jpg',
    category: 'Travel Gear'
  }
])

const filteredProducts = computed(() => {
  let result = [...products.value]
  if (activeCategory.value !== 'All Products') {
    result = result.filter(p => p.category === activeCategory.value)
  }
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

const handleDrop = async (items) => {
  console.log('Dropped items:', items)
  for (const item of items) {
    if (!cartItems.value.find(i => i.id === item.id)) {
      console.log('Cart items:', cartItems.value)
      cartItems.value.push(item)
    }
    console.log(item.name + ' added to cart')
    products.value = products.value.filter(p => p.id !== item.id)
  }

  console.log('products:', products.value)
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
  cartItems.value = cartItems.value.filter(
    i => i.id !== item.id
  )

  products.value.push(item)
}
</script>