// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-vue3-google-signin", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  ssr: false,
  vite: {},
  features: {
    devLogs: false,
    // or 'silent' to allow you to handle yourself with dev:ssr-logs hook
  },
  googleSignIn: {
    clientId:
      "1044712585347-ctp0cq62k0ljekp1q1bka7u390g1sv8d.apps.googleusercontent.com",
  },
  pinia: {
    storesDirs: ["./store/**", "./custom-folder/store/**"],
  },
});
