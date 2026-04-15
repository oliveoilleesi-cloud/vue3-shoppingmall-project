<template>
  <!-- Header -->
  <div class="text-center mb-8">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
      <span class="text-2xl">🔒</span>
    </div>
    <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Login</h2>
  </div>

  <!-- Form -->
  <div class="p-6 rounded-xl">
    <div class="mx-auto w-fit">
      <form class="text-left" @submit.prevent="handleLogin">
        <!-- user-id -->
        <div class="mb-6">
          <label for="user-id" class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
            <span class="inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">user-id</span>
              User Id
            </span>
          </label>
          <input id="user-id" type="text" v-model="userId"
            class="block w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
            placeholder="Enter your User Id" required />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
            <span class="inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">lock</span>
              Password
            </span>
          </label>
          <div class="relative">
            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
              class="block w-full px-4 py-3 pr-12 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
              placeholder="Enter your password" required />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary">
              <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>
        <!-- Captcha -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
            <span class="inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">security</span>
              Security Verification
            </span>
          </label>
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <input type="text" v-model="captchaInput"
                class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-center font-mono"
                placeholder="Enter code" maxlength="6" required />
            </div>
            <div class="flex-shrink-0">
              <div
                class="w-32 h-12 bg-primary hover:bg-primary-dark rounded-lg flex items-center justify-center font-mono font-bold text-white text-lg tracking-widest shadow-md cursor-pointer select-none transition-colors"
                @click="generateCaptcha" title="Click to refresh">
                {{ captchaCode }}
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-gray-400 mt-2">Enter the code shown in the box above</p>
        </div>

        <!-- Remember & Forgot Password -->
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="rememberMe"
              class="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" />
            <span class="text-sm text-slate-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isLoading"
          class="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg">
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing in...
          </span>
        </button>
      </form>
    </div>
    <!-- Divider -->
    <div class="mt-8">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white dark:bg-gray-800 text-slate-500">or continue with</span>
        </div>
      </div>

      <!-- Social Login -->
      <div class="mt-6 grid grid-cols-2 gap-4">
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:border-secondary hover:bg-secondary/10 dark:hover:bg-gray-700 transition-all">
          <span class="material-symbols-outlined text-secondary">work</span>
          <span class="text-sm font-medium text-slate-700 dark:text-gray-300">Work Account</span>
        </button>
        <button
          class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:border-primary hover:bg-primary/10 dark:hover:bg-gray-700 transition-all">
          <span class="material-symbols-outlined text-primary">business</span>
          <span class="text-sm font-medium text-slate-700 dark:text-gray-300">Company ID</span>
        </button>
      </div>
    </div>

    <!-- Register Link -->
    <p class="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
      New to B2B Portal?
      <router-link to="/register" class="text-primary hover:underline font-medium">Create business account</router-link>
    </p>
    <modal-confirm v-if="showModal" :title="modalData.title" :message="modalData.message" :button-text="modalData.buttonText" :confirm-text="modalData.confirmText" @close="handleModalClose" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalConfirm from '../components/modals/ModalConfirm.vue'

const router = useRouter()
const userId = ref('')
const password = ref('')
const showPassword = ref(false)
const captchaCode = ref('')
const captchaInput = ref('')
const isLoading = ref(false)
const rememberMe = ref(false)

const showModal = ref(false)
const modalData = ref({
  title: '사업자 인증하기',
  message: '상품 구매를 위해 사업자 인증을 진행해 주세요.',
  confirmText: '인증하기',
  buttonText: '종료'
})

const handleModalClose = (event) => {
  showModal.value = false
  if (event.isOk) {
    router.push('/business')
  }
}

const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = code
}

const handleLogin = async () => {
  if (captchaInput.value.toUpperCase() !== captchaCode.value) {
    alert('Captcha verification failed. Please try again.')
    generateCaptcha()
    captchaInput.value = ''
    return
  }
  showModal.value = true

  // isLoading.value = true

  // // Mock login logic
  // setTimeout(() => {
  //   console.log('Login:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
  //   alert('Login successful!')
  //   router.push('/shop')
  //   isLoading.value = false
  // }, 1500)
}

// Generate captcha on mount
generateCaptcha()
</script>

<style scoped>
:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>