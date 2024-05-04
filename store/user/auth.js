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
  let user = ref(JSON.parse(localStorage.getItem("user")) || null);

  async function login(credential) {
    const data = JSON.stringify({ token: credential });
    await axios.post(URL + "/auth", data).then((userProfileData) => {
      console.log(userProfileData);
    });

    user.value = {};

    // user.value.google = googleData;
    // localStorage.setItem("user", JSON.stringify(user.value));
    // this.router.push({ path: "/profile" });
  }
  async function logout() {
    console.log("store.user.authStore.logout");
    user.value = null;
    localStorage.setItem("user", JSON.stringify(user.value));
    this.router.push({ path: "/authentication" });
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
