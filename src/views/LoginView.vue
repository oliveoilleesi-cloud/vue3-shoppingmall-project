<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <span class="text-2xl">🔒</span>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">B2B Login</h2>
        <p class="text-slate-600 dark:text-gray-400">Secure Business Portal</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
            <span class="inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">email</span>
              Business Email
            </span>
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="block w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white"
            placeholder="business@company.com"
            required
          />
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
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="block w-full px-4 py-3 pr-12 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
            >
              <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- Captcha -->
        <div class="mb-6 p-4 bg-slate-50 dark:bg-gray-700 rounded-xl">
          <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
            <span class="inline-flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">security</span>
              Security Verification
            </span>
          </label>
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <input
                type="text"
                v-model="captchaInput"
                class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-center font-mono"
                placeholder="Enter code"
                maxlength="6"
                required
              />
            </div>
            <div class="flex-shrink-0">
              <div 
                class="w-32 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-mono font-bold text-white text-lg tracking-widest shadow-md cursor-pointer select-none"
                @click="generateCaptcha"
                title="Click to refresh"
              >
                {{ captchaCode }}
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-gray-400 mt-2">Enter the code shown in the box above</p>
        </div>

        <!-- Remember & Forgot Password -->
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
            />
            <span class="text-sm text-slate-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
        >
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Signing in...
          </span>
        </button>
      </form>

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
          <button class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
            <span class="material-symbols-outlined text-blue-500">work</span>
            <span class="text-sm font-medium text-slate-700 dark:text-gray-300">Work Account</span>
          </button>
          <button class="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-700 transition-all">
            <span class="material-symbols-outlined text-green-500">business</span>
            <span class="text-sm font-medium text-slate-700 dark:text-gray-300">Company ID</span>
          </button>
        </div>
      </div>

      <!-- Register Link -->
      <p class="mt-8 text-center text-sm text-slate-600 dark:text-gray-400">
        New to B2B Portal?
        <router-link to="/register" class="text-primary hover:underline font-medium">Create business account</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const captchaCode = ref('')
const captchaInput = ref('')
const isLoading = ref(false)
const rememberMe = ref(false)

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

  isLoading.value = true
  
  // Mock login logic
  setTimeout(() => {
    console.log('Login:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
    alert('Login successful!')
    router.push('/shop')
    isLoading.value = false
  }, 1500)
}

// Generate captcha on mount
generateCaptcha()
</script>

<style scoped>
:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>