// store/filters.ts
import { defineStore } from "pinia";
const store = {
  id: "store",
  state: () => ({
    userProfile: {
      isLoggined: false,
      email: null,
      name: null,
    },
  }),
  actions: {
    assignUserProfileData(userProfileData) {
      console.log("userProfileData", userProfileData);
      const { email, name } = userProfileData;
      this.userProfile.email = email;
      this.userProfile.name = name;
      this.userProfile.isLoggined = true;
    },
  },
};
export const useStore = defineStore(store);
