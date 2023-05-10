export default defineNuxtConfig({
  typescript: {
    strict: false
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',

  ],
  publicRuntimeConfig: {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET
  }
})
