<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  businessRegistrationNumber: '',
  companyName: '',
  representativeName: '',
  foundationDate: '',
  businessAddress: '',
  businessLicenseImage: null,
  terms: false,
  verified: false
})

const licenseImagePreview = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.businessLicenseImage = file
    const reader = new FileReader()
    reader.onload = (e) => {
      licenseImagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  if (!form.terms || !form.verified) {
    alert('모든 약관에 동의하고 확인을 해주세요.')
    return
  }

  const formData = new FormData()
  formData.append('businessRegistrationNumber', form.businessRegistrationNumber)
  formData.append('companyName', form.companyName)
  formData.append('representativeName', form.representativeName)
  formData.append('foundationDate', form.foundationDate)
  formData.append('businessAddress', form.businessAddress)
  if (form.businessLicenseImage) {
    formData.append('businessLicenseImage', form.businessLicenseImage)
  }

  console.log('Form Data:', Object.fromEntries(formData))
  // TODO: API 호출
  alert('승인 요청이 완료되었습니다.')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          사업자 등록 신청
        </h1>
        <p class="text-slate-600 dark:text-gray-400">
          사업자 정보를 입력하여 회원가입을 완료해주세요
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- 사업자 정보 -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">business</span>
              사업자 정보
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 사업자등록번호 -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">badge</span>
                    사업자등록번호 *
                  </span>
                </label>
                <input
                  type="text"
                  v-model="form.businessRegistrationNumber"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="123-45-67890"
                  maxlength="13"
                  required
                />
              </div>

              <!-- 상호명 -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">store</span>
                    상호명 *
                  </span>
                </label>
                <input
                  type="text"
                  v-model="form.companyName"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="회사명을 입력하세요"
                  required
                />
              </div>

              <!-- 대표자 -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">person</span>
                    대표자명 *
                  </span>
                </label>
                <input
                  type="text"
                  v-model="form.representativeName"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  placeholder="대표자 성함을 입력하세요"
                  required
                />
              </div>

              <!-- 창립기념일 -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                  <span class="inline-flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">event</span>
                    창립기념일 *
                  </span>
                </label>
                <input
                  type="date"
                  v-model="form.foundationDate"
                  class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          <!-- 사업장 정보 -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">location_on</span>
              사업장 정보
            </h3>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">
                <span class="inline-flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">location_city</span>
                  사업자등록증 사본 (사진 파일) *
                </span>
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                @change="handleFileChange"
                class="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white dark:bg-gray-800 text-slate-900 dark:text-white"
                required
              />
              <p class="text-xs text-slate-500 dark:text-gray-500 mt-1">
                이미지 (JPG, PNG) 또는 PDF 파일만 업로드 가능합니다.
              </p>
            </div>

            <!-- 이미지 미리보기 -->
            <div v-if="licenseImagePreview" class="mt-4">
              <img :src="licenseImagePreview" alt="사업자등록증 사본 미리보기" class="max-w-full h-auto rounded-lg border-2 border-slate-200 dark:border-gray-600" />
            </div>
          </div>

          <!-- 약관 동의 -->
          <div class="bg-slate-50 dark:bg-gray-700 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">gavel</span>
              약관 동의
            </h3>

            <div class="space-y-3">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.terms"
                  class="w-5 h-5 mt-0.5 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-slate-600 dark:text-gray-400">
                  <a href="#" class="text-primary hover:underline">이용약관</a> 에 동의합니다
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="form.verified"
                  class="w-5 h-5 mt-0.5 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-slate-600 dark:text-gray-400">
                  입력한 정보의的真实性을 확인합니다
                </span>
              </label>
            </div>
          </div>

          <!-- 제출 버튼 -->
          <div class="flex justify-center pt-4">
            <button
              type="submit"
              class="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold rounded-xl transition-all shadow-lg transform hover:scale-105"
            >
              승인 요청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.primary {
  color: #3b82f6;
}
</style>