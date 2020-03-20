<template>
  <div id="keyboard-canvas">
    <div>
      <div id="current">
        <kbd v-if="letter">
          {{ letter.keyboard.key }}
        </kbd>
      </div>
      <!-- <div id="current">
        <kbd v-if="lettersBefore(1)">
          {{ lettersBefore(1).keyboard.key }}
        </kbd>
      </div> -->
      <div id="previous">
        <template v-for="({ text }, index) of letters">
          <kbd v-if="text" :key="index">
            {{ text.keyboard.key }}
          </kbd>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KeyboardCanvasUpload",
  props: {
    time: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    lettersBefore(idx) {
      const l = this.filteredTrack.filter(entry => {
        return entry.keyboard.key !== "";
      });
      return l.length >= idx ? l[l.length - idx] : false;
    }
  },
  computed: {
    ...mapState(["records"]),

    track() {
      const record = this.records.find(recording => {
        return recording.id === this.$route.params.id;
      });
      return record.track.filter(entry => {
        return !entry.mouse;
      });
    },
    filteredTrack() {
      const first = this.track[0];
      const f = this.track.filter(entry => {
        return entry.timestamp < first.timestamp + this.time;
      });
      return f;
    },
    letter() {
      return this.filteredTrack.length > 0
        ? this.filteredTrack[this.filteredTrack.length - 1]
        : false;
    },

    letters() {
      return [
        { text: this.lettersBefore(1) },
        { text: this.lettersBefore(2) },
        { text: this.lettersBefore(3) }
      ];
    }
  }
};
</script>

<style lang="stylus" scoped>
kbd
  background-color #ddd
  padding 0.25rem 0.5rem
  border 1px solid #aaa
  border-radius 4px
  box-shadow 1px 1px 3px 1px #aaa
  font-size 1.4rem
div#keyboard-canvas
  div
    background-color white
    height 3.2rem
    display flex
    flex-flow column wrap
    justify-content center
    div
      background-color none
      align-items center
      height 0
      display flex
      padding 0
      margin 0
    div#current
      justify-content center
      background-color none
      width 100%
    div#previous
      kbd
        opacity 0.5
      flex-flow row-reverse nowrap
      width 40%
      justify-content space-around
</style>
