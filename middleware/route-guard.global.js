const userIsAuthenticated = false;

export default defineNuxtRouteMiddleware((to, from) => {
  if (isValidRoot(to)) {
    return;
  } else return navigateTo("/authentication");
});

function isValidRoot(to) {
  if (userIsAuthenticated) {
    return true;
  } else if (to.fullPath === "/" || to.fullPath === "/authentication") {
    return true;
  }
  return false;
}
