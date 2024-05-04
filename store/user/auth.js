import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://api-1-0-0fru.onrender.com"
    : "http://localhost:3080";
// function getUserFields() {
//   return {
//     google: null,
//   };
// }
//JSON.stringify(googleData)
export const useAuthStore = defineStore("auth", () => {
  const store = useStore()
  const router = store.router
  
  let user = ref(null)

  fetchUser()
  async function fetchUser() {
    const id = JSON.parse(localStorage.getItem("userID"))
    if (!id) {
      console.log('store.auth.fetchUser.id:',id);
      return null
    }
    const data = JSON.stringify({ userID: id });
    await axios.post(URL + "/auth", data).then((userProfileData) => {
      const data = userProfileData.data
      console.log('store.auth.fetchUser', { userProfileData: data })
      // console.log({ userProfileDataById: userProfileData.data });
      user.value = data
      console.log('store.auth.fetchUser.redirect');
      router.push({ path: "/profile" });

    });
  }
  async function login(credential) {
    const data = JSON.stringify({ token: credential });
    user.value = await axios.post(URL + "/auth", data).then((userProfileData) => {
      console.log({ userProfileData: userProfileData.data });
      return userProfileData.data
    });
    localStorage.setItem("userID", JSON.stringify(user.value.userID));
    console.log('store.auth.login.redirect');
    router.push({ path: "/profile" });
  }
  async function logout() {
    console.log("store.user.authStore.logout");
    user.value = null;
    localStorage.setItem("userID", null);
    console.log('store.auth.logout.redirect');
    router.push({ path: "/authentication" });
  }
  return { user, login, logout };
});



// import { defineStore } from "pinia";
// function getUserFields() {
//   return {
//     google: null,
//   };
// }
// export const useAuthStore = defineStore("auth",{
//   state: () => ({
//     user: JSON.parse(localStorage.getItem("user")) || null,
//   }),
//   actions: {
//     async login(googleData) {
//       //   console.log("store.auth.login.googleData", googleData);
//       this.user = getUserFields();
//       this.user.google = googleData;
//       console.log("store.authStore.login", this.user);
//       // this.saveUserProfile();
//       localStorage.setItem("user", JSON.stringify(this.user));
//       this.router.push({ path: "/profile" });
//     },
//     async logout() {
//       console.log("store.user.authStore.logout");
//       this.user = null;
//       localStorage.setItem("user", JSON.stringify(this.user));
//       this.router.push({ path: "/authentication" });
//     },
//   },
// });
