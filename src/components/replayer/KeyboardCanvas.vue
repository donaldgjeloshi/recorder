<template>
  <div id="keyboard-canvas">
    <svg viewBox="0 0 400 30">
      <text
        x="200"
        y="22"
        text-anchor="middle"
        v-for="(entry, idx) of filteredTrack"
        v-bind:key="idx"
      >
        {{ entry.keyboard ? entry.keyboard.key : "" }}
      </text>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KeyboardCanvas",
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["records"]),

    track() {
      const record = this.records.find(recording => {
        return recording.id == this.$route.params.id;
      });
      return record.track;
    },
    filteredTrack() {
      const first = this.track[0];
      return this.track.filter(entry => {
        return entry.timestamp <= first.timestamp + this.time;
      });
    } /* ,
    letter() {
      for (const entry of this.filteredTrack) {
        return filteredTrack.length > 0 ? entry.keyboard.key : "";
      }
    } */
  }
};
</script>

<style lang="stylus" scoped>
text
  font-size 15px
</style>
