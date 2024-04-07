import { useStore } from "~/stores/";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  const userIsAuthenticated = store.$state.userProfile.isLoggined;
  if (isValidRoot(to, userIsAuthenticated)) {
    return;
  } else {
    console.log("root-guard");
    return navigateTo("/authentication");
  }
});

function isValidRoot(to, userIsAuthenticated) {
  if (userIsAuthenticated) {
    return true;
  } else if (to.fullPath === "/" || to.fullPath === "/authentication") {
    return true;
  }
  return false;
}
