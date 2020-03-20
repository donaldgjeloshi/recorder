<template>
  <div class="upload">
    <br />
    <FileReader @load="jsonData" />
    <br />
  </div>
</template>

<script>
import FileReader from "@/components/uploader/FileReader.vue";

export default {
  name: "Upload",
  components: {
    FileReader
  },
  methods: {
    jsonData(loadedFile) {
      const records = localStorage.getItem("recorder-records");
      if (records) {
        this.$store.commit("load", records);
      }
      localStorage.setItem("recorder-records", loadedFile);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
