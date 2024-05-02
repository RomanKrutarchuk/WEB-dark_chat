<template>
  <div id="page" class="flex md:items-center md:justify-center">
    <div
      class="w-screen h-screen md:w-400 md:h-400 flex flex-col items-center justify-center md:justify-start bg-stone-900"
    >
      <p class="my-2">Authentication</p>
      <input class="my-2 bg-transparent" type="text" placeholder="email" />
      <input class="my-2 bg-transparent" type="text" placeholder="password" />
      <AuthenticationComponent class="my-2" />
    </div>
  </div>
</template>

<script setup>
// import { useAuthStore } from "~/store/users/authStore";
// import { useUsersStore } from "~/store/users";
// const usersStore = useUsersStore();
// const store = useAuthStore();

// console.log("index.usersStore", usersStore);
// export default {
//   methods: {
//     redirect() {
//       this.$router.push("/profile");
//     },
//   },
// };
</script>
