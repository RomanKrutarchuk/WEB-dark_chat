import { useAuthStore } from "~/store/user/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log("route-guard-check");
  const store = useAuthStore();
  const userIsLoggined =
    store.user != null && store.user.google ? true : false;

  if (!userIsLoggined) {
    console.log({ userIsLoggined });
    if (to.fullPath != "/authentication") {
      return navigateTo("/authentication");
    }
  }
});
