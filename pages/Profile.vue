<template>
  <div id="page">
    <div class="h-screen flex flex-col">
      <div id="userProfile" v-if="userProfileData" class="w-screen md:w-400 md:h-screen p-2 bg-stone-900">
        <div v-for="(field, index) in userProfileFields" :key="index">
          <div v-if="field === 'picture'" class="flex items-center justify-center my-2">
            <img :src="userProfileData[field]" />
          </div>
          <div v-else class="flex items-center justify-center my-2">
            {{ userProfileData[field] }}
          </div>
        </div>
        <hr />

        <div>
          <div>activeUsers:</div>
          <div v-for="(user, index) in activeUsers" :key="index">
            {{ user.name }}
          </div>
        </div>

      </div>
      <div v-else>empty user data</div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "~/store/user";
import { useUsersStore } from "~/store/users";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {
      userProfileFields: ["picture", "name", "email"],
      users: null,
      loading: false,
    };
  },
  computed: {
    userProfileData: {
      get() {
        const { user } = storeToRefs(useUserStore());
        return user.value
      },
    },
    activeUsers: {
      get() {
        const { users } = storeToRefs(useUsersStore())
        return users.value
      },
    }
  },
  methods: {
  },
};
</script>
