import { useAuthStore } from "~/store/user/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { userIsLoggined } = useAuthStore()
  if (await userIsLoggined()) {
    return
  } else {
    if (to.fullPath !== "/authentication") {
      return navigateTo("/authentication");
    }
  }
});
