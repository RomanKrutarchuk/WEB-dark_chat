export default defineNuxtPlugin(({ $pinia, $router }) => {
//   console.log({ $pinia, $router });
  $pinia.use(({ store }) => {
    store.router = $router;
  });
});
