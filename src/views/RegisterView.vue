<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <span class="text-2xl">📋</span>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
        <p class="text-slate-600 dark:text-gray-400">Join our B2B Business Portal</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister">
        <div class="space-y-6">
          <!-- Member Info -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">person</span>
              Member Information
            </h3>

            <!-- ID & Password -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">account_circle</span>
                    User ID *
                  </span>
                </label>
                <input
                  type="text"
                  v-model="form.id"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="Enter user ID"
                  required
                  minlength="4"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">lock</span>
                    Password *
                  </span>
                </label>
                <input
                  type="password"
                  v-model="form.password"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="Enter password"
                  required
                  minlength="8"
                />
              </div>
            </div>

            <!-- Name & Phone -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">badge</span>
                    Full Name *
                  </span>
                </label>
                <input
                  type="text"
                  v-model="form.name"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">smartphone</span>
                    Phone Number *
                  </span>
                </label>
                <div class="flex gap-2">
                  <input
                    type="tel"
                    v-model="form.phone"
                    class="flex-1 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                    placeholder="010-1234-5678"
                    required
                    pattern="[0-9-]"
                  />
                  <button
                    type="button"
                    @click="sendPhoneVerification"
                    :disabled="phoneVerificationSent || phoneVerificationTimer > 0"
                    class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-xl transition-all whitespace-nowrap shadow-lg"
                  >
                    {{ phoneVerificationTimer > 0 ? `${phoneVerificationTimer}s` : '인증하기' }}
                  </button>
                </div>
                <div v-if="phoneVerificationSent" class="mt-2">
                  <input
                    type="text"
                    v-model="form.phoneVerificationCode"
                    class="w-full px-4 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-center"
                    placeholder="Enter verification code"
                    maxlength="6"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">alternate_email</span>
              Contact Information
            </h3>

            <!-- Email -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <span class="inline-flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">email</span>
                  Email Address *
                </span>
              </label>
              <div class="flex gap-2">
                <input
                  type="email"
                  v-model="form.email"
                  class="flex-1 px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="your@email.com"
                  required
                />
                <button
                  type="button"
                  @click="sendEmailVerification"
                  :disabled="emailVerificationSent || emailVerificationTimer > 0"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-xl transition-all whitespace-nowrap shadow-lg"
                >
                  {{ emailVerificationTimer > 0 ? `${emailVerificationTimer}s` : '인증하기' }}
                </button>
              </div>
              <div v-if="emailVerificationSent" class="mt-2">
                <input
                  type="text"
                  v-model="form.emailVerificationCode"
                  class="w-full px-4 py-2 border-2 border-slate-200 dark:border-gray-600 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-center"
                  placeholder="Enter verification code"
                  maxlength="6"
                />
              </div>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">gavel</span>
              Terms & Conditions
            </h3>

            <div class="space-y-3">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.terms"
                  class="w-5 h-5 mt-0.5 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-slate-600 dark:text-gray-400">I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a> and <a href="#" class="text-primary hover:underline">Privacy Policy</a></span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.marketing"
                  class="w-5 h-5 mt-0.5 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-slate-600 dark:text-gray-400">I agree to receive marketing communications</span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.verified"
                  class="w-5 h-5 mt-0.5 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-slate-600 dark:text-gray-400">I certify that I am authorized to represent this organization</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-8">
          <button
            type="button"
            @click="router.push('/login')"
            class="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all"
          >
            Go to Login
          </button>
          <button
            type="submit"
            :disabled="isLoading || !form.terms"
            class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Creating...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore.js'

const router = useRouter()
const store = useProductStore()

const form = ref({
  id: '',
  password: '',
  name: '',
  phone: '',
  phoneVerificationCode: '',
  email: '',
  emailVerificationCode: '',
  terms: false,
  marketing: false,
  verified: false
})

const phoneVerificationSent = ref(false)
const emailVerificationSent = ref(false)
const phoneVerificationTimer = ref(0)
const emailVerificationTimer = ref(0)
const phoneVerificationCode = ref('')
const emailVerificationCode = ref('')
const isLoading = ref(false)

// Phone verification
const sendPhoneVerification = () => {
  if (!form.value.phone) {
    alert('Please enter phone number')
    return
  }
  // Generate random 6-digit code
  phoneVerificationCode.value = Math.floor(100000 + Math.random() * 900000).toString()
  phoneVerificationSent.value = true
  
  // Start countdown
  let timer = 30
  phoneVerificationTimer.value = timer
  const interval = setInterval(() => {
    timer--
    phoneVerificationTimer.value = timer
    if (timer <= 0) {
      clearInterval(interval)
    }
  }, 1000)

  console.log('Phone verification code sent:', phoneVerificationCode.value)
}

// Email verification
const sendEmailVerification = () => {
  if (!form.value.email) {
    alert('Please enter email address')
    return
  }
  // Generate random 6-digit code
  emailVerificationCode.value = Math.floor(100000 + Math.random() * 900000).toString()
  emailVerificationSent.value = true
  
  // Start countdown
  let timer = 30
  emailVerificationTimer.value = timer
  const interval = setInterval(() => {
    timer--
    emailVerificationTimer.value = timer
    if (timer <= 0) {
      clearInterval(interval)
    }
  }, 1000)

  console.log('Email verification code sent:', emailVerificationCode.value)
}

const handleRegister = () => {
  // Validate passwords match
  if (form.value.password.length < 8) {
    alert('Password must be at least 8 characters')
    return
  }

  // Validate terms
  if (!form.value.terms) {
    alert('Please agree to Terms of Service')
    return
  }

  // Validate verification codes (mock)
  if (!form.value.phoneVerificationCode) {
    alert('Please enter phone verification code')
    return
  }
  if (!form.value.emailVerificationCode) {
    alert('Please enter email verification code')
    return
  }

  isLoading.value = true

  // Mock registration
  setTimeout(() => {
    console.log('Registration:', form.value)
    alert('Account created successfully!')
    router.push('/login')
    isLoading.value = false
  }, 1500)
}
</script>

<style scoped>
:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>