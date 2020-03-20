<template>
  <div id="record" tabindex="0" @click="onPlay">
    <div id="info">
      <div>
        <label for="record-id">
          <abbr>ID</abbr>
        </label>
        <span id="record-id">{{ record.id }}</span>
      </div>
      <div>
        <label for="record-scene">
          Scene
        </label>
        <span id="record-scene">{{ record.scene }}</span>
      </div>
      <div>
        <label for="record-type">
          Input
        </label>
        <span id="record-type">{{ record.input.label }}</span>
      </div>
    </div>
    <div id="controls">
      <font-awesome-icon
        tabindex="0"
        size="lg"
        @click.stop="onPlay"
        icon="play"
      />
      <font-awesome-icon
        tabindex="0"
        size="lg"
        @click.stop="onDownload"
        icon="download"
      />
      <font-awesome-icon
        tabindex="0"
        size="lg"
        @click.stop="onTrash"
        icon="trash-alt"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Record",
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  methods: {
    onPlay() {
      this.$router.push({ name: "Replayer", params: { id: this.record.id } });
    },
    onDownload() {
      const blob = new Blob([JSON.stringify([this.record])]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = this.record.id;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onTrash() {
      this.$store.commit("delete", this.record.id);
      this.$store.commit("save");
    }
  }
};
</script>

<style lang="stylus" scoped></style>
