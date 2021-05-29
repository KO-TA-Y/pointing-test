<template>
  <div id="home" class="d-flex">
    <!-- 左のカード -->
    <v-card
      tile
      :width="width"
      :height="height"
      :style="{
        position:`absolute`,
        top:`50%`,
        left:`50%`,
        transform:`translate(-100%,-50%) translateX(-${distance/2}px)`
      }"
    ></v-card>
    <!-- 右のカード -->
    <v-card
      tile
      :width="width"
      :height="height"
      :style="{
        position:`absolute`,
        top:`50%`,
        left:`50%`,
        transform:`translate(0%,-50%) translateX(${distance/2}px)`
      }"
    ></v-card>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        distance:100,
        width:100,
        height:100,
      }
    },

    components: {
    },
  }
</script>

<style scoped>
  #home{
    width:100vw;       /* 幅いっぱい*/
    height:100vh;      /* 高さいっぱい*/
    background:gray; /* 背景グレー*/
    color:white;     /* 文字色を白*/
  }
</style>
