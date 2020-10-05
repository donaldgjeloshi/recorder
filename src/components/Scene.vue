<template>
  <div @click="onClick" id="scene">Scene {{ num }}</div>
</template>

<script>
export default {
  name: "Scene",
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$router.push({ name: "Recorder", params: { scene: this.num } });
      this.$vToastify.info(
        "The recommended input query is 'dalgona coffee'. In order to measure the performance you have to calculate the speed. Don't worry it is very easy; characters / seconds. The informations are saved and can be replayed to the replay page. GOOD LUCK!"
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
