<template>
  <div id="mouse-canvas">
    <svg viewBox="0 0 400 200">
      <!-- google shadow box -->
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="gray" />
        </filter>
      </defs>

      <g v-for="(entry, idx) of filteredTrack" :key="idx">
        <circle
          :cx="400 * entry.mouse.relX"
          :cy="200 * entry.mouse.relY"
          r="0.3"
        />
        <line
          v-if="idx > 0"
          :x1="400 * filteredTrack[idx - 1].mouse.relX"
          :y1="200 * filteredTrack[idx - 1].mouse.relY"
          :x2="400 * entry.mouse.relX"
          :y2="200 * entry.mouse.relY"
          :stroke="
            colorStroke(
              400 * filteredTrack[idx - 1].mouse.relX,
              200 * filteredTrack[idx - 1].mouse.relY,
              400 * entry.mouse.relX,
              200 * entry.mouse.relY
            )
          "
        />
      </g>
      <!-- Szene "Google Search" -->
      <image
        href="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        height="140"
        width="140"
        x="130"
        y="25"
      />
      <rect
        id="search"
        x="72"
        y="130"
        width="250"
        height="24"
        rx="3"
        style="fill:white; filter:url(#shadow);"
      />

      <rect x="0" y="0" width="60" height="15" style="fill:white" />
      <rect
        x="3"
        y="3"
        width="60"
        height="30"
        rx="2"
        style="fill:white; filter:url(#shadow);"
      />

      <foreignObject x="6" y="6" width="20" height="20">
        <div>
          <font-awesome-icon icon="info" />
        </div>
      </foreignObject>

      <text
        v-if="seconds != 0 || milliseconds > 200"
        id="timestamp"
        x="23"
        y="20"
      >
        {{ seconds }}:{{ milliseconds }}
      </text>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MouseCanvas",
  data() {
    return {
      timeSpan: 0,
      milliseconds: 0,
      seconds: 0,
    };
  },
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
  methods: {
    colorStroke(x1, y1, x2, y2) {
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let color = "white";
      if (length < 2) {
        color = "green";
      } else if (length < 6) {
        color = "yellow";
      } else if (length < 12) {
        color = "orange";
      } else if (length < 130) {
        color = "red";
      }
      return color;
    },
  },
  computed: {
    ...mapState(["records"]),
    track() {
      const record = this.records.find((recording) => {
        this.timeSpan = recording.savedOn - recording.startedOn;
        this.milliseconds = pad3(this.timeSpan % 1000);
        this.seconds = pad2(this.timeSpan / 1000);
        return recording.id == this.$route.params.id;
      });
      return record.track.filter((entry) => {
        return !entry.keyboard;
      });
    },
    filteredTrack() {
      const first = this.track[0];
      return this.track.filter((entry) => {
        return entry.timestamp <= first.timestamp + this.time;
      });
    },
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
line
  stroke-width 0.7
text
  font-size 0.5rem
</style>
