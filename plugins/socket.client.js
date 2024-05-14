import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const { $URLs } = useNuxtApp()
  const socket = io($URLs.API);
  return {
    provide: {
      socket,
    },
  };
});
