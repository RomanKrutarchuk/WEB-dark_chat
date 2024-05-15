import { useAuthStore } from "~/store/user/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { userIsLoggined } = useAuthStore()
  const { user } = storeToRefs(useAuthStore())
  if (user.value != null) {
    return
  }
  if (await userIsLoggined()) {
    return
  } else {
    if (to.fullPath !== "/authentication") {
      return navigateTo("/authentication");
    }
  }
});
