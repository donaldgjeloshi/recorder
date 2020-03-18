<template>
  <div class="col-sm-3">
    <label class="file-reader" style="color: rgb(104,182,132)">
      Upload
      <input type="file" @change="loadJSONFromFile" />
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    loadJSONFromFile(event) {
      const FIRST_FILE = 0;
      const file = event.target.files[FIRST_FILE];
      //constructor
      const reader = new FileReader();

      reader.onload = e => {
        this.$emit("load", e.target.result);
        const textFile = e.target.result;
        console.log(textFile);
      };
      reader.readAsText(file);
    }
  }
};
</script>

<style>
.file-reader {
  border: 2px solid rgb(104, 182, 132);
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.file-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>
