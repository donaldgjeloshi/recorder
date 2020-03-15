<template>
  <div id="replayer">
    <Info />
    <MouseCanvas v-bind:time="timer" />
    <KeyboardCanvas v-bind:time="timer" />
    <button v-on:click="onStart">Start</button>
    <button v-on:click="onStop">Stop</button>
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
      animationFrameID: 0
    };
  },
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
    }
  }
};
</script>

<style lang="stylus" scoped></style>
