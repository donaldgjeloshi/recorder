<template>
  <div id="keyboard-canvas">
    <svg viewBox="0 0 400 30">
      <text x="200" y="22" text-anchor="middle">{{ letters }}</text>
    </svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KeyboardCanvas",
  created() {
    const bodies = document.getElementsByTagName("body");
    const body = bodies[0];
    body.addEventListener("keydown", e => {
      if (!e.repeat && this.recorder.state === "active") {
        this.$store.commit("updateKeyboard", {
          key: e.key,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          timestamp: e.timeStamp
        });
      }
    });
    body.addEventListener("keyup", e => {
      if (this.recorder.state === "active") {
        this.$store.commit("updateKeyboard", {
          key: "",
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
          altKey: false,
          timestamp: e.timeStamp
        });
      }
    });
  },
  computed: {
    ...mapState(["recorder"]),
    letters() {
      const track = this.recorder.track;
      const length = track.length - 1;
      return track.length > 0 ? track[length].keyboard.key : "";
    }
  }
};
</script>

<style lang="stylus" scoped>
text
  font-size 15px
</style>
