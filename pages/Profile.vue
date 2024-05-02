<template>
  <div id="page">
    <div class="h-screen flex flex-col">
      <div
        id="userProfile"
        v-if="userProfileData"
        class="w-screen md:w-400 md:h-screen p-2 bg-stone-900"
      >
        <div v-for="(field, index) in userProfileFields" :key="index">
          <div
            v-if="field === 'picture'"
            class="flex items-center justify-center my-2"
          >
            <img :src="userProfileData[field]" />
          </div>
          <div v-else class="flex items-center justify-center my-2">
            {{ userProfileData[field] }}
          </div>
        </div>
        <hr />
        <div v-if="activeUSers !== null">
          <div>activeUsers:</div>
          <div v-for="(user, index) in activeUSers" :key="index">
            {{ user.email }}
          </div>
        </div>
      </div>
      <div v-else>empty user data</div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/store/user";
export default {
  data() {
    return {
      activeUSers: null,
      userProfileData: null,
      userProfileFields: ["picture", "name", "email"],
    };
  },
  mounted() {
    const userStore = useUserStore();
    // console.log({userStore});
    if (userStore.user && userStore.user.google.email) {
      this.userProfileData = userStore.user.google;

      // const { $socket } = useNuxtApp();
      // $socket.emit("sendUserProfile", store.$state.userProfile);
      // $socket.on("serverEmitAllUsers", (data) => {
      //   // console.log("serverSendAllUsers",data);
      //   store.assignActiveUsers(data);
      //   console.log(data);
      //   this.activeUSers = data;
      // });
    }
    // console.log(store.user.google);
  },
  methods: {},
};
</script>
