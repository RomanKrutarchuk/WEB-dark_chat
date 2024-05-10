import { useAuthStore } from "~/store/user/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { getId } = useAuthStore()
  const id = getId()
  if (!id) {
    console.log('middleware.router-guard.missing-id');
    if (to.fullPath != "/authentication") {
      return navigateTo("/authentication");
    }
  }
  // const { $socket } = useNuxtApp()
  // const connected = $socket.connected
  // if (connected) {
  //   const { getId } = useAuthStore()
  //   const id = getId()
  //   if (!id) {
  //     console.log('middleware.router-guard.missing-id');
  //     if (to.fullPath != "/authentication") {
  //       return navigateTo("/authentication");
  //     }
  //   }
  // } else {
  //   if (to.fullPath != "/error") {
  //     return navigateTo("/error")
  //   }
  // }
});
