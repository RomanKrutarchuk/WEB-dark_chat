import { useAuthStore } from "~/store/user/auth";

export default defineNuxtPlugin(({ $pinia, $router }) => {
  $pinia.use(({ store }) => {
    store.router = $router;
  });

  const { fetchUser } = useAuthStore()
  fetchUser()
});
