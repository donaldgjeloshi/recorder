<template>
  <div id="mouse-canvas">
    <svg ref="mouseCanvas" viewBox="0 0 400 200" @mousemove="onMouseMove">
      <circle
        v-for="(entry, idx) of track"
        :key="idx"
        :cx="entry.mouse.relX * 400"
        :cy="entry.mouse.relY * 200"
        r="0.5"
      />
      <text v-if="recorder.state === 'active'" id="timestamp" x="330" y="14">
        {{ hours }}:{{ minutes }}:{{ seconds }}:{{ miliseconds }}
      </text>
      <circle v-if="recordDisplayShow" cx="390" cy="10" r="6" fill="red" />
    </svg>
  </div>
</template>

<script>
import eventBus from "@/utils/app/event.js";
import { mapState } from "vuex";
export default {
  name: "MouseCanvas",
  data() {
    return {
      track: [],
      recordDisplayShow: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  },
  methods: {
    onMouseMove(e) {
      if (this.recorder.state === "active") {
        const {
          width,
          height
        } = this.$refs.mouseCanvas.getBoundingClientRect();
        const { offsetX, offsetY, buttons } = e;
        this.$store.commit("updateMouse", {
          relX: offsetX / width,
          relY: offsetY / height,
          x: offsetX,
          y: offsetY,
          timestamp: e.timeStamp,
          buttons
        });
        this.$store.commit("record");
      }
    },
    tick() {
      if (this.recorder.state === "active") {
        const l = this.recorder.track.length;
        this.track = this.recorder.track.slice(l - 400, l);
        this.updateTimestamp();
        window.requestAnimationFrame(this.tick);
      }
    },
    updateTimestamp() {
      const diff = Math.abs(Date.now() - this.recorder.timestamp);
      //const rightDate = diff.toISOString();
      this.miliseconds = pad3(diff % 1000);
      this.seconds = pad2(diff / 1000);
      this.minutes = pad2(diff / (1000 * 60));
      this.hours = pad2(diff / (1000 * 60 * 60));
      //console.log(Date.now());
      console.log(this.recorder.timestamp);
    }
  },
  computed: {
    ...mapState(["recorder"])
  },
  created() {
    eventBus.$on("start-recording", () => {
      this.tick();
      this.recordDisplay = setInterval(() => {
        this.recordDisplayShow = !this.recordDisplayShow;
      }, 750);
    });
    eventBus.$on("stop-recording", () => {
      this.recordDisplayShow = false;
      clearInterval(this.recordDisplay);
    });
  }
};

function pad2(num) {
  num = Math.floor(num);
  return num < 10 ? `0${num}` : `${num}`;
}
function pad3(num) {
  num = Math.floor(num);
  return num < 10 ? `00${num}` : num < 100 ? `0${num}` : `${num}`;
}
</script>

<style lang="stylus" scoped>
svg#mouseCanvas
  width 100%
text#timestamp
  font-size 0.5rem
</style>
