// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-vue3-google-signin", "@pinia/nuxt"],
  plugins: [],
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
  runtimeConfig: {
    public: {
      API_URL:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3080"
          : process.env.API_URL,
      SOCKET_API_URL:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3080"
          : process.env.SOCKET_API_URL,
    },
  },
});
