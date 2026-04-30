// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt Shopping Mall',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'A shopping mall built with Nuxt 3' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // $production: {
  //   apiBase: 'https://api.example.com',
  //   routeRules: {
  //     '/**': {isr: true}
  //   }
  // },
  // $development: {
  //   apiBase: 'http://localhost:3000',
  //   routeRules: {
  //     '/**': {isr: false}
  //   }
  // },

  // $env: {
  //   staging: {
  //   }
  // },

  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
