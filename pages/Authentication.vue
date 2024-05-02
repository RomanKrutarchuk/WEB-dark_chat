<template>
  <div id="page">
    <div class="flex justify-center items-center">
      <div class="sm:w-full w-600 flex flex-col items-center bg-stone-900">
        <p class="my-2">Authentication</p>
        <input class="my-2 bg-transparent" type="text" placeholder="email" />
        <input class="my-2 bg-transparent" type="text" placeholder="password" />
        <AuthenticationComponent class="my-2" />
      </div>
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
