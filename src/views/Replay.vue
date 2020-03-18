<template>
  <div>
    <br />
    <FileReader />
    <br />
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
import FileReader from "@/components/replayer/FileReader.vue";

export default {
  name: "Replay",
  components: { Record, FileReader },
  computed: mapState(["records"]),
  methods: {
    scene(id) {
      return this.records.filter(e => e.scene === id);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
