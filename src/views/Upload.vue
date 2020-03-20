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
  data() {
    return { file: "" };
  },
  components: {
    FileReader
  },
  methods: {
    jsonData(loadedFile) {
      this.file = loadedFile;
      localStorage.setItem("recorder-records", this.file);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
