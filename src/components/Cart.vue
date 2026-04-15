<template>
  <div
    class="border-2 border-dashed rounded-2xl p-6 min-h-[300px] transition"
    :class="isDragging ? 'border-secondary bg-secondary/10' : 'border-gray-300'"
    @dragover.prevent
    @dragleave="isDragging = false"
    @drop.prevent="onDropEvent"
  >
    <h2 class="text-xl font-bold mb-4">🛒 장바구니</h2>

    <div v-if="items.length === 0" class="text-gray-400">
      여기에 상품을 드롭하세요
    </div>

    <transition-group name="list" tag="div" class="space-y-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="p-4 border rounded-xl bg-secondary/5 shadow-sm flex justify-between"
      >
        <div>
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-sm text-gray-400">₩{{ item.price }}</p>
        </div>

        <button
          class="px-2 py-1 text-sm bg-primary hover:bg-primary-dark text-white rounded transition-colors"
          @click="remove(item)"
        >
          제거
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['drop', 'remove'])

const isDragging = ref(false)

const onDropEvent = (e) => {
  isDragging.value = false

  const json = e.dataTransfer.getData('application/json')
  if (!json) return

  const item = JSON.parse(json)
  console.log('Dropped cart item:', item)

  emit('drop', item)
}

const remove = (item) => {
  emit('remove', item)
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>