<template>
    <div class="fixed inset-0 z-[100] flex items-center justify-center px-8">
        <div class="absolute inset-0 bg-on-surface backdrop-blur-sm"></div>
        <!-- Modal Container -->
        <div class="relative bg-white w-full max-w-sm rounded-2xl p-8 flex flex-col items-center text-center shadow-[0px_12px_32px_rgba(26,28,30,0.12)]">
            <!-- Success Icon with Subtle Blue Accent -->
            <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-left">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-3xl"
                        style="font-variation-settings: 'FILL' 1;">Success</span>
                </div>
            </div>
            <!-- Content -->
            <h4 class="font-headline text-xl font-extrabold text-on-surface tracking-tight mb-2 whitespace-pre-line">
                {{ title }}
            </h4>
            <p class="font-body text-on-surface-variant text-sm leading-relaxed mb-8 whitespace-pre-line">
                {{ message }}
            </p>
            <!-- Primary Action Button -->
            <button
                class="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl shadow-[0px_8px_16px_rgba(0,62,199,0.2)] active:scale-95 transition-all duration-200"
                @click="handleClose">
                {{ buttonText }}
            </button>
        </div>
    </div>    
</template>
<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Success!'
    },
    message: {
        type: String,
        default: 'Your coupon has been applied! The discount is now reflected in your total amount.'
    },
    buttonText: {
        type: String,
        default: 'Continue Shopping'
    }
})

const emit = defineEmits(['close'])
const handleClose = () => {
    emit('close', {isOk: true})
}
</script>
<style scoped>
</style>