<template>
  <div id="home" class="d-flex">
    <div class="pl-7 pt-7">
      {{ num }}/{{ total }}セット目<br />
      成功回数：{{ success }}/{{ totalSuccess }}<br />
      ミス回数：{{ miss }}
    </div>
    <!-- 左のカード -->
    <v-card
      @mousedown="incrementSuccess"
      tile
      :width="width"
      :height="height"
      :color="
            success % 2 == 0 && success < totalSuccess
              ? targetColor
              : disabledColor
          "
      :disabled="
            (success % 2 == 0) && (success < totalSuccess)
              ? false
              : true
          "
      :style="{
        position:`absolute`,
        top:`50%`,
        left:`50%`,
        transform:`translate(-100%,-50%) translateX(-${distance/2}px)`
      }"
    ></v-card>
    <!-- 右のカード -->
    <v-card
      @mousedown="incrementSuccess"
      tile
      :width="width"
      :height="height"
      :color="
            success % 2 == 0 || success >= totalSuccess
              ? disabledColor
              : targetColor
          "
      :disabled="
            success % 2 == 0 || success >= totalSuccess
              ? true
              : false
          "
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
        num:1,
        total:36,
        totalSuccess:7,
        success:0, //ボタンを押したら増えて、偶奇で色などを変える
        miss:0,
        targetColor: "red",
        disabledColor: "white",
      }
    },

    methods: {
      incrementSuccess(){
        this.success++
      },
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
