import { useStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
  if (isValidRoot(to)) {
    return;
  } else {
    console.log("root-guard");
    return navigateTo("/authentication");
  }
});

function isValidRoot(to) {
  const store = useStore();
  const userIsAuthenticated = store.$state.userProfile.isLoggined;
  if (userIsAuthenticated) {
    return true;
  } else if (to.fullPath === "/" || to.fullPath === "/authentication") {
    return true;
  }
  return false;
}
