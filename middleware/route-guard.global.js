import { useAuthStore } from "~/store/user/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log("route-guard-check");
  const { user } = storeToRefs(useAuthStore());

  const userIsLoggined =
    user.value != null && user.value.email ? true : false;

  if (!userIsLoggined) {
    console.log('middleware.router-guard.userIsLoggined:',userIsLoggined);
    if (to.fullPath != "/authentication") {
      return navigateTo("/authentication");
    }
  }
});
