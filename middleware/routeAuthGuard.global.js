import { useAuthStore } from "~/store/user/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { userIsLoggined } = useAuthStore()
  const { user } = storeToRefs(useAuthStore())
  const { $connected } = useNuxtApp()
  console.log("routeGuard.socketConnection", $connected.value);
  if ($connected.value) {
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
  } 
  else {
    if (to.fullPath !== "/await") {
      return navigateTo("/await");
    }
  }

});
