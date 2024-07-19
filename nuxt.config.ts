// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "vue-final-modal/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  // cors 오류 -> 서버 주소
  routeRules: {
    "/api/node/**": {
      proxy: { to: `${process.env.NUXT_PUBLIC_NODE_API_URL}/**` },
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
