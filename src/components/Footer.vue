<template>
    <!-- Footer -->
    <div class="bg-white border-t border-primary/10 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 text-primary mb-6">
              <span class="material-symbols-outlined text-3xl">App</span>
              <h2 class="text-xl font-extrabold tracking-tighter">MALL</h2>
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
</template>

<script setup>
const socialIcons = ['public', 'share']
const shopLinks = ['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards']
const supportLinks = ['Shipping Info', 'Returns & Exchanges', 'Contact Us', 'FAQ']
const extraShopLinks = ['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards']

</script>