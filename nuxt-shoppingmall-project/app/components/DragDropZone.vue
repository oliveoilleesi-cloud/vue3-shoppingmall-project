<template>
  <div
    ref="dropZoneRef"
    class="fixed bottom-24 left-0 w-full px-6 z-40"
    :class="isDragging ? 'border-secondary bg-secondary/10' : 'border-gray-300'"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="handleMobileClick"
  >
    <div class="max-w-xl mx-auto">

      <!-- 🔥 드롭/클릭 영역 -->
      <div
        class="bg-primary/5 border-2 border-dashed border-primary rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer"
        :class="{ 'drop-active': isDragging }"
        v-if="!isMobile"
      >
        <div
          class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary"
          :class="{ 'animate-pulse': !isDragging, 'scale-110': isDragging }"
        >
          <span class="material-symbols-outlined text-3xl">
            add_shopping_cart
          </span>
        </div>

        <p class="font-bold text-lg">
          Drop here to add to cart
        </p>
        <p class="text-xs text-primary/60 mt-2">Release to secure your order</p>
      </div>

      <!-- 모바일용 클릭 영역 -->
      <div
        v-else
        class="bg-primary/5 border-2 border-dashed border-primary rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur-md transition-all duration-300"
        @click="openFileInput"
      >
        <div
          class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary animate-pulse"
        >
          <span class="material-symbols-outlined text-3xl">
            add_shopping_cart
          </span>
        </div>

        <p class="font-bold text-lg">
          Tap to add items
        </p>
        <p class="text-xs text-primary/60 mt-2">Or drag & drop</p>
      </div>

      <!-- 숨겨진 파일 입력 -->
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />

      <!-- 🔥 장바구니 리스트 -->
      <div
        v-if="items.length"
        class="mt-4 bg-white rounded-2xl shadow-lg p-4"
      >
        <h3 class="font-bold mb-3">🛒 Cart</h3>

        <transition-group name="list" tag="div" class="space-y-2">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex justify-between items-center p-2 border rounded-lg"
          >
            <div>
              <p class="text-sm font-semibold">{{ item.name }}</p>
              <p class="text-xs text-gray-400">₩{{ item.price }}</p>
            </div>

            <button
              class="text-xs px-2 py-1 bg-primary hover:bg-primary-dark text-white rounded transition-colors"
              @click="$emit('remove', item)"
            >
              제거
            </button>
          </div>
        </transition-group>
      </div>

      <!-- 🔥 비어있을 때 -->
      <div
        v-else
        class="mt-4 text-center text-gray-400 text-sm"
      >
        장바구니가 비어있습니다
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  onDrop: {
    type: Function,
    required: true
  }
})

const dropZoneRef = ref(null)
const fileInput = ref(null)
const isDragging = ref(false)
const isMobile = ref(false)

// 모바일 감지
onMounted(() => {
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
})

const handleDragOver = (event) => {
  event.preventDefault()
  if (!isDragging.value) {
    isDragging.value = true
  }
}

const handleDragLeave = (event) => {
  if (event.relatedTarget && event.relatedTarget.closest('.drop-active')) {
    return
  }
  isDragging.value = false
}

const handleDrop = async (event) => {
  event.preventDefault()
  isDragging.value = false

  const droppedItems = event.dataTransfer.getData('application/json')
  console.log('Dropped items:', droppedItems)
  
  if (droppedItems) {
    try {
      const items = JSON.parse(droppedItems)
      await props.onDrop(items)
    } catch (error) {
      console.error('Failed to parse dropped items:', error)
    }
  }

  emit('drop', {
    items: props.items,
    event
  })
}

// 모바일 클릭 처리
const handleMobileClick = (event) => {
  if (isMobile.value) {
    // 드래그 영역이 클릭되었을 때만
    if (event.target.closest('.cursor-pointer')) {
      openFileInput()
    }
  }
}

// 파일 선택 창 열기
const openFileInput = () => {
  fileInput.value?.click()
}

// 파일 선택 처리
const handleFileSelect = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    const items = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      price: Math.floor(Math.random() * 10000) + 1000,
      image: URL.createObjectURL(file)
    }))
    props.onDrop(items)
  }
}

const emit = defineEmits(['drop', 'remove'])
</script>

<style scoped>
.drop-active {
  @apply bg-primary/10 border-primary scale-105;
  box-shadow: 0 20px 40px rgba(236, 72, 153, 0.25);
}

.drag-enter {
  @apply scale-105;
}
</style>