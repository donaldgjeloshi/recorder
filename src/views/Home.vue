<template>
  <div>
    <br />
    <br />
    <div class="flex-container">
      <a href="/recorder-public/#/record">
        <div>
          Record
        </div>
      </a>
      <a href="/recorder-public/#/upload">
        <div>
          Upload
        </div>
      </a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {}
};
</script>
<style lang="stylus" scoped>
.flex-container
  display: flex;
.flex-container > a:link, a:visited
  text-decoration none
  color #abd1b5
.flex-container > a:hover
  border-radius 10px
  background-color #094d92
  color #95e06c
.flex-container > a:active
  color #094d92
.flex-container > a > div
  background-color: white
  margin: 0.3rem
  padding: 13.5rem
  padding-bottom 19rem
  font-size: 50px
  border 1px solid #aaa
  border-radius 10px
  box-shadow 1px 1px 2px 2px #aaa
</style>
