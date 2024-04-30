import { useAuthStore } from "~/store/user/auth";
let loggined = false;
export default defineNuxtRouteMiddleware((to, from) => {
  if (!loggined) {
    console.log("route-guard-check");
    const store = useAuthStore();
    if (store.user && store.user.google.email) {
      loggined = true;
    } else {
      if (to.fullPath != "/authentication") {
        return navigateTo("/authentication");
      }
    }
  }
});
