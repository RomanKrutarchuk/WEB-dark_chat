<template>
  <!-- page bag scroll -->
  <div id="page">
    <div v-if="userProfileData" class="w-screen h-screen p-2">
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
      <table id="users" class="w-screen mb-2">
        <p>active</p>
        <tr class="">
          <td class="border border-white first">index</td>
          <td class="border border-white">name</td>
        </tr>
        <tr v-for="(user, index) in activeUsers" :key="index">
          <td class="border border-white">{{ index }}</td>
          <td class="border border-white">{{ user.name }}</td>
        </tr>
      </table>
      <div id="room" class="">
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
          <p>room</p>
          <tr class="">
            <td
              v-for="(field, index) in roomFields"
              :key="index"
              class="border border-white"
            >
              {{ field }}
            </td>
          </tr>
          <tr v-for="(player, index) in players" :key="index" id="players">
            <td class="border border-white first">{{ index }}</td>
            <td v-if="player.id" class="border border-white" @click="exit()">
              {{ player.id }}
            </td>
            <td
              v-else-if="!player.id"
              class="border border-white"
              @click="join(index)"
            >
              ...join
            </td>
          </tr>
        </table>

        <div id="field" class="w-screen flex justify-center">
          <div class="w-300 h-300 border border-white container">
            <div
              id="cell"
              v-for="(cell, index) in cells"
              :key="index"
              class="w-[auto] h-[auto] border border-white"
            ></div>
          </div>
        </div>
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
export default {
  data() {
    return {
      room: null,
      cells: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
      roomFields: ["plase", "name"],
      userProfileFields: ["picture", "name", "email"],
      users: null,
      loading: false,
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
        return users.value;
      },
    },
    players: {
      get() {
        const { room } = storeToRefs(useRoomStore());
        return room.value;
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