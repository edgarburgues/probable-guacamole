export default defineNuxtConfig({
  typescript: {
    strict: false
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',

  ],

  runtimeConfig: {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET
  }
})
