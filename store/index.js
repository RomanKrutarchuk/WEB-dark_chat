// store/filters.ts
import { defineStore } from "pinia";
const store = {
  id: "store",
  state: () => ({
    userProfile: {
      isLoggined: false,
      email: null,
      name: null,
      picture: null,
    },
  }),
  actions: {
    assignUserProfileData(userProfileData) {
      // console.log("userProfileData", userProfileData);
      const { email, name, picture } = userProfileData;
      this.userProfile.email = email;
      this.userProfile.name = name;
      this.userProfile.isLoggined = true;
      this.userProfile.picture = picture;
    },
  },
};
export const useStore = defineStore(store);
