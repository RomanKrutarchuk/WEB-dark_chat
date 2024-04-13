<template>
  <div id="page" class="flex justify-center items-center">
    <div class="sm:w-full w-600 h-400 flex flex-col items-center">
      <p class="my-2">Authentication</p>
      <input class="my-2 bg-transparent" type="text" placeholder="email" />
      <input class="my-2 bg-transparent" type="text" placeholder="password" />
      <AuthenticationComponent @succes="redirect" class="my-2" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push("/profile");
    },
  },
};
</script>
