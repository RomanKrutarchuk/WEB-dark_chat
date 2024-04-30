import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const { user } = storeToRefs(useAuthStore());
  return { user };
});
