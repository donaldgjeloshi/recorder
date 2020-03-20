<template>
  <div>
    <div id="replay">
      <div id="scene-1">
        <h4>Scene 1</h4>
        <Record v-for="record of scene(1)" :key="record.id" :record="record" />
      </div>
      <div id="scene-2">
        <h4>Scene 2</h4>
        <Record v-for="record of scene(2)" :key="record.id" :record="record" />
      </div>
      <div id="scene-3">
        <h4>Scene 3</h4>
        <Record v-for="record of scene(3)" :key="record.id" :record="record" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Record from "@/components/Record.vue";
export default {
  name: "Replay",
  components: { Record },
  computed: mapState(["records"]),
  methods: {
    scene(id) {
      return this.records.filter(e => e.scene === id);
    }
  },
  created() {
    const records = localStorage.getItem("recorder-records");
    if (records) {
      this.$store.commit("load", records);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
