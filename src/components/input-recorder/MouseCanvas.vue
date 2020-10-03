<template>
  <div id="mouse-canvas">
    <svg ref="mouseCanvas" viewBox="0 0 400 200" @mousemove="onMouseMove">
      <!-- Szene "Google Search" -->
      <image
        href="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        height="140"
        width="140"
        x="130"
        y="25"
      />
      <foreignObject id="object"
        x="70"
        y="130"
        width="250"
        height="30"
        rx="13"
      >
        <div id="div-search">
           <input :disabled="recorder.state === 'deactive'" type="search" id="search" name="search">
        </div>
      </foreignObject>
      <circle
        v-for="(entry, idx) of track"
        :key="idx"
        :cx="entry.mouse.relX * 400"
        :cy="entry.mouse.relY * 200"
        r="0.5"
      />
      <rect x="0" y="0" width="60" height="15" style="fill:white" />
      <text v-if="recorder.state === 'active'" id="timestamp" x="15" y="14">
        {{ seconds }}:{{ miliseconds }}
      </text>
      
      <!-- display time after finished -->
      <text
        v-if="recorder.state === 'deactive' && miliseconds != 0"
        id="timestamp"
        x="15"
        y="14"
      >
        {{ seconds }}:{{ miliseconds }}
      </text>
      <circle v-if="recordDisplayShow" cx="60" cy="11" r="6" fill="red" />
      
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
      miliseconds: 0,
    };
  },
  methods: {
    onMouseMove(e) {
      if (this.recorder.state === "active") {
        const {
          width,
          height,
        } = this.$refs.mouseCanvas.getBoundingClientRect();
        const { offsetX, offsetY, buttons } = e;
        this.$store.commit("updateMouse", {
          relX: offsetX / width,
          relY: offsetY / height,
          x: offsetX,
          y: offsetY,
          timestamp: e.timeStamp,
          buttons,
        });
      }
    },
    tick() {
      if (this.recorder.state === "active") {
        const track = this.recorder.track.filter((entry) => {
          return !entry.keyboard;
        });
        const l = track.length;
        this.track = l >= 400 ? track.slice(l - 400, l) : track;
        this.updateTimestamp();
        window.requestAnimationFrame(this.tick);
      }
    },
    updateTimestamp() {
      const diff = Math.abs(Date.now() - this.recorder.startedOn);
      this.miliseconds = pad3(diff % 1000);
      this.seconds = pad2(diff / 1000);
      this.minutes = pad2(diff / (1000 * 60));
      this.hours = pad2(diff / (1000 * 60 * 60));
    },
  },
  computed: {
    ...mapState(["recorder"]),
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
  },
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
input#search
  width 99%
  padding 4px 3px
  
  box-sizing border-box
  border-radius 5px
</style>
