<template>
  <div 
    class="group cursor-pointer"
    @dragstart="handleDragStart"
    draggable="true"
  >
    <div draggable="true" @dragstart="handleDragStart"
      class="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-100">
      <!-- Product Image -->
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        :style="{ backgroundImage: `url('${product.image}')` }"></div>

      <!-- New Badge -->
      <div v-if="product.isNew" class="absolute top-3 right-3 z-10">
        <div class="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">new_releases</span>
          <span>New</span>
        </div>
      </div>

      <!-- Favorite Button -->
      <div class="absolute top-3 left-3 z-10">
        <button
          class="p-2 bg-white/80 backdrop-blur rounded-full text-slate-900 hover:bg-white transition-colors shadow-sm"
          @click.stop="toggleFavorite">
          <span class="material-symbols-outlined text-sm">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-sm font-semibold text-slate-900 mb-1">{{ product.name }}</h3>
        <div class="flex items-center gap-1 mb-1">
          <span class="material-symbols-outlined text-[16px] text-primary fill-1">star</span>
          <span class="text-xs font-medium text-slate-500">{{ product.rating }} ({{ product.reviews }} reviews)</span>
        </div>
        <p class="text-base font-bold text-primary">${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isDraggable: {
    type: Boolean,
    default: false
  }
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const handleDragStart = (event) => {
  if (!props.isDraggable) return

  console.log(props.product) // 드래그 시작 시 제품 정보 로그 출력

  // 드래그되는 데이터 설정
  event.dataTransfer.setData('application/json', JSON.stringify([props.product]))
  event.dataTransfer.effectAllowed = 'copy'

  // 드래그 이미지 커스터마이징 (선택사항)
  event.dataTransfer.setDragImage(event.currentTarget, 0, 0)
}
</script>

<style scoped>
/* No inline styles needed - all styles are now Tailwind classes */
</style>