<template>
  <div 
    class="group cursor-pointer"
    @dragstart="handleDragStart"
    @click="handleClick"
    draggable="true"
  >
    <div draggable="true" @dragstart="handleDragStart"
      class="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-100 margin-10">
      <!-- Product Image -->
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        :style="{ backgroundImage: `url('${product.image}')` }"></div>

      <!-- New Badge -->
      <div v-if="product.isNew" class="absolute top-3 right-3 z-10">
        <div class="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">new</span>
        </div>
      </div>

            <!-- Favorite Button -->
      <div class="absolute top-3 left-3 z-10">
        <button
          class="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-sm"
          :class="product.isFavorite ? 'text-orange-500' : 'text-slate-700'"
          type="button"
          aria-label="favorite"
          @click.stop="toggleFavorite"
        >
          <!-- Heart icon (SVG) -->
          <svg
            v-if="product.isFavorite"
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

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isDraggable: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function,
    required: false,
    default: null
  }
})

const emit = defineEmits(['clickFavorite'])

const toggleFavorite = () => {
  // favorite 상태 변경은 상위(ShopView)에서 store 기준으로 처리
  emit('clickFavorite', props.product)
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

const handleClick = () => {
  if (props.onClick) {
    props.onClick(props.product)
    return
  }
}

</script>

<style scoped>
/* No inline styles needed - all styles are now Tailwind classes */
</style>