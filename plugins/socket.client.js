import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? process.env.SOCKET_API_URL
    : "http://localhost:3080";
const socket = io(URL);
socket.on("hello", (data) => {
  console.log(data);
});

export default defineNuxtPlugin(() => {
  return {
    provide: {
      socket,
    },
  };
});
