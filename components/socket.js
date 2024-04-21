import { io } from "socket.io-client";

// URLS = {
//   API_URL: "https://api-1-0-0fru.onrender.com/",
//   SOCKET_API_URL: "https://api-1-0-0fru.onrender.com/",
// };

export const socket = io("http://localhost:3080/");
