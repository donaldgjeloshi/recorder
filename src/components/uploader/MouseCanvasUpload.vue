<template>
  <div id="mouse-canvas">
    <svg viewBox="0 0 400 200">
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
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MouseCanvasUpload",
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  methods: {
    colorStroke(x1, y1, x2, y2) {
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let color = "red";
      if (length < 2) {
        color = "green";
      } else if (length < 6) {
        color = "yellow";
      } else if (length < 12) {
        color = "orange";
      }
      return color;
    }
  },

  computed: {
    ...mapState(["records"]),
    track() {
      const record = this.records.find(recording => {
        return recording.id == this.$route.params.id;
      });
      return record.track.filter(entry => {
        return !entry.keyboard;
      });
    },
    filteredTrack() {
      const first = this.track[0];
      return this.track.filter(entry => {
        return entry.timestamp <= first.timestamp + this.time;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
line
  stroke-width 0.5
</style>
