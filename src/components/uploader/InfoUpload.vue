<template>
  <div id="info">
    <div id="id">
      <label for="record-id">ID: </label>
      <span id="record-id">{{ this.file.id }}</span>
    </div>
    <div id="timestamp">
      <label for="record-timestamp">Created on: </label>
      <span id="record-timestamp">{{ this.file.savedOn }}</span>
    </div>
    <div id="scene">
      <label for="record-scene">Scene: </label>
      <span id="record-scene">{{ this.file.scene }}</span>
    </div>
    <div id="input">
      <label for="record-input">Input: </label>
      <span id="record-input">{{ this.file.input.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoUpload",
  props: {
    file: {
      type: Object,
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
