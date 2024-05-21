<template>
  <div
    id="loadingIndicator"
    class="loading-indicator"
    :style="{ color: color }"
  >
    <div class="dot">#</div>
    <div class="dot">#</div>
    <div class="dot">#</div>
    <div v-if="text">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      require: false,
      default: () => {
        return "black";
      },
    },
    text: {
      require: false,
      default: () => {
        return null;
      },
    },
  },
};
</script>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: space-between;
  width: 50px;
}

.dot {
  width: max-content;
  opacity: 0;
  animation: fade 1.5s infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.5s;
}

.dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes fade {
  0%,
  25%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>