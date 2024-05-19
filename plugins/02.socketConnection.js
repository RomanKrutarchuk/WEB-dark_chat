import { io } from "socket.io-client";
import { ref } from "vue";

export default defineNuxtPlugin(() => {
  const { $URLs } = useNuxtApp()
  const socket = io($URLs.API);
  const connected = ref(false)

  socket.on('connect', () => {
    // console.log('socketConnection:', true);
    connected.value = true
  });
  socket.on('disconnect', () => {
    // console.log('socketConnection:', false);
    connected.value = false
  });
  
  return {
    provide: {
      socket,
      connected,
    },
  };
});
