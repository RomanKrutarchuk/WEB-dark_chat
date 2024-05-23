<template>
  <!-- page bag scroll -->
  <div id="page" class="overflow-y-auto">
    <div v-if="userProfileData" class="w-screen h-max p-2">
      <div id="profile" class="mb-2">
        <div v-for="(field, index) in userProfileFields" :key="index">
          <div
            v-if="field === 'picture'"
            class="border border-white w-[80px] p-1"
          >
            <img class="grayscale" :src="userProfileData[field]" />
          </div>
          <div v-else class="flex items-center">
            {{ userProfileData[field] }}
          </div>
        </div>
      </div>
      <!-- <div class="border border-white"> -->
      <!-- <div v-for="(user, index) in activeUsers" :key="index" class="flex flex-row">
            <div>{{ index }}</div>
            {{ user.name }}
          </div> -->
      <!-- </div> -->
      <table id="users" class="w-screen h-max mb-2">
        <!-- <p>active</p> -->
        <tr class="">
          <td class="border border-white first">index</td>
          <td class="border border-white">name</td>
        </tr>
        <tr v-for="(user, index) in activeUsers" :key="index">
          <td class="border border-white">{{ index }}</td>
          <td class="border border-white">{{ user.name }}</td>
        </tr>
      </table>
      <div id="room" class="h-max">
        <!-- <p>Room</p> -->

        <!-- <div v-for="(player, index) in players" :key="index" id="players" class="w-screen h-[20px]">
            <div v-if="player.id" class="flex flex-row">{{ index }}:{{ player.id }} <div class="ml-2" @click="exit()">
                exit</div>
            </div>
            <div v-else class="flex flex-row">{{ index }}:...<p v-if="!player.id" @click="join(index)">
                join
              </p>
            </div>
          </div> -->
        <table id="room" class="w-screen mb-2">
          <!-- <p>room isReady:{{ roomIsReady }}</p> -->
          <tr class="">
            <td
              v-for="(field, index) in roomFields"
              :key="index"
              class="border border-white"
            >
              {{ field }}
            </td>
          </tr>
          <tr
            v-for="(player, index) in activePlayers"
            :key="index"
            id="players"
          >
            <td class="border border-white first">{{ index }}</td>
            <td
              v-if="player != null"
              class="border border-white flex flex-row"
              @click="exit()"
            >
              {{ player.name }}
              <p v-if="player.id === userProfileData.id" class="ml-2">exit</p>
            </td>
            <td v-else class="border border-white" @click="join(index)">
              <LoadingIndicator :color="'white'" :text="'join'" />
            </td>
          </tr>
        </table>

        <div
          v-if="roomIsReady && currentWalker.id"
          id="field"
          class="w-screen h-max flex flex-col justify-center relative"
        >
          <div
            v-if="showWin"
            class="absolute w-screen h-max p-2 bg-white text-black top-[50%]"
          >
            Player win: {{ showWinPlayer }}
          </div>
          <div id="currentMove" class="mb-2 flex flex-row">
            move:{{ currentWalker.name }}
            <LoadingIndicator
              v-if="currentWalker.id === userProfileData.id"
              class="ml-2"
              :color="'white'"
              :text="'walk'"
            />
          </div>
          <div
            class="w-[250px] h-[250px] md:w-300 md:h-300 border border-white container"
            v-if="cells"
          >
            <div
              id="cell"
              v-for="(cell, index) in cells"
              :key="index"
              class="w-[auto] h-[auto] border border-white text-white"
            >
              <div v-if="cell.id" class="w-screen h-screen">
                <div
                  v-if="cell.id === userProfileData.id"
                  class="w-screen h-screen bg-green-900"
                ></div>
                <div v-else class="w-screen h-screen bg-red-900"></div>
              </div>
              <div
                v-if="!cell.id && userProfileData.id === currentWalker.id"
                @click="selectCell(cell)"
                class="w-screen h-screen bg-stone-500 flex items-center justify-center"
              >
                select
              </div>
              <div
                v-else-if="!cell.id"
                class="w-screen h-screen bg-stone-500 flex items-center justify-center"
              >
                await
              </div>
            </div>
          </div>
        </div>
        <table v-if="scoreBar" id="scoreBar" class="w-screen h-max mb-2">
          <p>Score</p>
          <tr class="">
            <td class="border border-white first">index</td>
            <td class="border border-white">name</td>
            <td class="border border-white">score</td>
          </tr>
          <tr v-for="(player, index) in scoreBar" :key="index">
            <td class="border border-white first">{{ index }}</td>
            <td class="border border-white first">{{ player.name }}</td>
            <td class="border border-white first">{{ player.score }}</td>
            <!-- <td class="border border-white first">{{ player}}</td> -->
          </tr>
        </table>
      </div>
    </div>
    <div v-else>empty user data</div>
  </div>
</template>
<script>
import { useUserStore } from "~/store/user";
import { useUsersStore } from "~/store/users";
import { useRoomStore } from "~/store/room";
import { storeToRefs } from "pinia";
import LoadingIndicator from "~/components/LoadingIndicator.vue";
export default {
  components: { LoadingIndicator },
  data() {
    return {
      room: null,
      roomFields: ["plase", "name"],
      userProfileFields: ["picture", "name", "email"],
      users: null,
      loading: false,
      showWin: false,
      showWinPlayer: null,
      scoreBar: null,
    };
  },
  computed: {
    userProfileData: {
      get() {
        const { user } = storeToRefs(useUserStore());
        return user.value;
      },
    },
    activeUsers: {
      get() {
        const { users } = storeToRefs(useUsersStore());
        this.setScoreBarData(users);

        return users.value;
      },
      set() {
        this.scoreBar = 10;
      },
    },
    activePlayers: {
      get() {
        const { room } = storeToRefs(useRoomStore());
        return room.value;
      },
    },
    roomIsReady: {
      get() {
        const { roomIsReady } = storeToRefs(useRoomStore());
        return roomIsReady.value;
      },
    },
    currentWalker: {
      get() {
        const { currentWalker } = storeToRefs(useRoomStore());
        if (this.activePlayers[currentWalker.value])
          return this.activePlayers[currentWalker.value];
        return false;
      },
    },
    cells: {
      get() {
        const { cells } = storeToRefs(useRoomStore());
        return cells.value;
      },
    },
  },
  methods: {
    join(index) {
      const { roomSetUser } = useRoomStore();
      roomSetUser(index, this.userProfileData.id);
    },
    exit() {
      const { roomExcludeUser } = useRoomStore();
      const id = this.userProfileData.id;
      roomExcludeUser(id);
      console.log("exit", id);
    },
    selectCell(cell) {
      console.log("selectCell", cell);
      const data = {
        index: cell.index,
        id: this.userProfileData.id,
      };
      const { $socket } = useNuxtApp();
      $socket.emit("selectCell", JSON.stringify(data));
    },
    setScoreBarData(users) {
      this.scoreBar = users.value.map((user) => {
        return { id: user.id, name: user.name, score: 0 };
      });
    },
    showWinBar(id) {
      this.showWin = true;
      if (this.activePlayers.find((player) => player.id === id)) {
        this.showWinPlayer = this.activePlayers.find(
          (player) => player.id === id
        ).name;
      }
      setTimeout(() => {
        this.showWin = false;
        this.showWinPlayer = false;
      }, 2000);
    },
  },
  mounted() {
    const { $socket } = useNuxtApp();

    $socket.on("room.playerWin", (id) => {
      this.showWinBar(id);
      this.scoreBar.find((player) => player.id === id).score++;
    });
  },
};
</script>
<style>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.grayscale {
  filter: grayscale(1);
  transition: 0.5s;
}

.grayscale:hover {
  filter: grayscale(0);
}

.first {
  width: 20px;
  overflow: hidden;
}
</style>