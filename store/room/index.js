import { defineStore } from "pinia"
import { ref, watch } from "vue"
import axios from "axios"
export const useRoomStore = defineStore("room", () => {
    const { $socket } = useNuxtApp()
    const { $URLs } = useNuxtApp()
    const URL = $URLs.API

    const room = ref(null)
    const roomIsReady = ref(false)
    const cells = ref(null)
    const currentWalker = ref(0)

    $socket.on("room.isReady", async (data) => {
        const isReady = data
        // console.log({ isReady });
        roomIsReady.value = data
    })
    $socket.on("room.updateGame", (data) => {
        // console.log("room.updateGame", JSON.parse(data));
        const game = JSON.parse(data)
        cells.value = game.cells
        currentWalker.value = game.currentWalker
    })
    $socket.on("room.update", async (data) => {
        // room.value = JSON.parse(data)
        const roomUsers = JSON.parse(data)
        console.log("room.update", roomUsers);
        const activeUsers = [null, null]
        for (let id = 0; id < roomUsers.length; id++) {
            if (roomUsers[id].id != null) {
                const data = JSON.stringify(roomUsers[id])
                await axios.post(URL + "/getUserData", data).then((res) => {
                    const roomActiveUserData = res.data
                    // console.log("store.room.Room_update.roomActiveUserData", { roomActiveUserData });
                    activeUsers[id] = roomActiveUserData
                })
            }
        }
        return room.value = activeUsers
    })

    async function roomSetUser(plaseIndex, id) {
        console.log("roomSetUser...");
        const data = JSON.stringify({ plaseIndex, id })
        $socket.emit("room.enter", data)
    }
    async function roomExcludeUser(id) {
        console.log("roomExcludeUser...");
        $socket.emit("room.exit", id)
    }
    return { room, roomIsReady, cells, currentWalker, roomSetUser, roomExcludeUser }
})
