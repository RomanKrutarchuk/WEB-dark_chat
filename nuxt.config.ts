// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  ssr: false,
  vite: {},
  features: {
    devLogs: false,
    // or 'silent' to allow you to handle yourself with dev:ssr-logs hook
  },
});
