<template>
  <div id="replayer">
    <Info />
    <MouseCanvas v-bind:time="timer" />
    <KeyboardCanvas v-bind:time="timer" />

    <div id="main">
      <button id="start" @click="onStart">
        <font-awesome-icon icon="play" />
        Start
      </button>
      <button id="stop" @click="onStop">
        <font-awesome-icon icon="stop" />
        Stop
      </button>
    </div>
  </div>
</template>

<script>
import Info from "@/components/replayer/Info.vue";
import MouseCanvas from "@/components/replayer/MouseCanvas.vue";
import KeyboardCanvas from "@/components/replayer/KeyboardCanvas.vue";
export default {
  name: "Replayer",
  components: { Info, MouseCanvas, KeyboardCanvas },
  data() {
    return {
      timer: 0,
      oldTimer: 0,
      requestStop: false,
      animationFrameID: 0,
    };
  },
  computed: {},
  methods: {
    onStart() {
      this.timer = 0;
      this.oldTimer = Date.now();
      this.update();

      //
    },
    update() {
      this.timer += Date.now() - this.oldTimer;
      this.oldTimer = Date.now();
      if (this.requestStop) {
        this.requestStop = false;
        this.timer = 0;
      } else {
        this.animationFrameID = requestAnimationFrame(this.update);
      }
    },
    onStop() {
      cancelAnimationFrame(this.animationFrameID);
      this.requestStop = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
#icon
  position relative
  top 1.4rem
  right 2rem
  width 0
  color white
  pointer-events none
</style>
