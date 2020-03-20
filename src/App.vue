<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/record">Record</router-link>
      <router-link to="/replay">Replay</router-link>
      <router-link to="/upload">Upload</router-link>
      <router-link to="/about">About</router-link>
      <SWUpdateInfo />
    </div>
    <router-view />
  </div>
</template>

<script>
import SWUpdateInfo from "@/components/SWUpdateInfo.vue";
export default {
  name: "App",
  components: { SWUpdateInfo },
  created() {
    const records = localStorage.getItem("recorder-records");
    if (records) {
      this.$store.commit("load", records);
    }
  }
};
</script>

<style lang="stylus">
@import "~@/style/index.styl"
</style>
