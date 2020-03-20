<template>
  <div class="upload">
    <br />
    <FileReader @load="jsonData" />
    <br />
    <InfoUpload :file="file" />
    <!--<MouseCanvasUpload />
    <KeyboardCanvasUpload /> -->
  </div>
</template>

<script>
import FileReader from "@/components/uploader/FileReader.vue";
import InfoUpload from "@/components/uploader/InfoUpload.vue";
/*import MouseCanvasUpload from "@/components/uploader/MouseCanvasUpload.vue";
import KeyboardCanvasUpload from "@/components/uploader/KeyboardCanvasUpload.vue"; */

export default {
  name: "Upload",
  data() {
    return { file: "" };
  },
  components: {
    FileReader,
    InfoUpload
    /*MouseCanvasUpload,
    KeyboardCanvasUpload */
  },
  methods: {
    jsonData(loadedFile) {
      this.file = loadedFile;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
