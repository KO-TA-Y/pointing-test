<template>
  <div id="home" @mousemove="mouseMove" @mousedown="incrementMiss">
    <div class="pl-7 pt-7">
      {{ num }}/{{ total }}セット目<br />
      成功回数：{{ success }}/{{ totalSuccess }}<br />
      ミス回数：{{ miss }}
    </div>
    <div
      style="
        position:absolute;
        top:70%;
        left:50%;
        transform:translateX(-50%);
      "
    >
      経過時間：{{ seconds | zeroPad }}.{{ milliSeconds | zeroPad(3) }}秒
    </div>
    <!-- 左のカード -->
    <v-card
      @mousedown.stop="incrementSuccess"
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
      @mousedown.stop="incrementSuccess"
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
    <div v-show="isInterval">
      <v-card
        color="deep-purple lighten-4"
        height="30vh"
        width="40vw"
        class="d-flex align-center justify-space-around mx-auto"
      >
        {{ num }}セット目の記録<br />
        {{ seconds | zeroPad }}.{{ milliSeconds | zeroPad(3) }}秒<br />
        ミス回数：{{ miss }}
      </v-card>
      <v-card
        color="orange"
        height="30vh"
        width="40vw"
        class="d-flex align-center justify-space-around mt-6 mx-auto"
        @mousedown.stop="toNext"
      >
        このオレンジ領域を<br />クリックすると<br />次のセットに進みます<br />
        （次に進む前に休憩をとってOKです）
      </v-card>
    </div>
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
        animateFrame: 0,  // requestAnimationFrame(cb) の返り値（requestID）が入る
        nowTime: 0,       // 現在時刻
        diffTime: 0,      // 現在時刻 と スタートボタンを押した時刻 の差
        startTime: 0,     // スタートボタンを押した時刻
        isRunning: false, // タイマーが走っているか判定
        isInterval: false,
        t_pos_arr: [],    //マウスの軌跡を入れる場所
        c_pos_arr: [],    //クリック座標を入れる場所
        tmp_x_pos: "",
        tmp_y_pos: "",
        res_arr: [],      //各試行の結果を入れる場所
      }
    },
    methods: {
      incrementSuccess(){
        if (this.success == 0) {
          this.startTimer()
        }
        if (this.success == this.totalSuccess - 1) {
          this.stopTimer()
        }
        this.c_pos_arr.push({
          section: this.num,
          result: "success",
          mouseX: this.tmp_x_pos,
          mouseY: this.tmp_y_pos,
          timestamp: this.diffTime,
        });
        this.success++
      },
      incrementMiss() {
        if (this.success < this.totalSuccess) {
          this.miss++;
          this.targetColor = "yellow";
          setTimeout(() => {
            this.targetColor = "red";
          }, 50);
          this.c_pos_arr.push({
            section: this.num,
            result: "miss",
            mouseX: this.tmp_x_pos,
            mouseY: this.tmp_y_pos,
            timestamp: this.diffTime,
          });
        }
      },
      toNext(){
        this.res_arr.push({
          section: this.num,
          width: this.width,
          height: this.height,
          time: this.diffTime/1000,
          miss: this.miss
        });
        this.isInterval=false
        this.num++
        this.initVal()
      },
      initVal(){
        this.success=0
        this.miss=0
        this.nowTime=0
        this.diffTime=0
        this.startTime=0
      },
      mouseMove(e) {
        this.tmp_x_pos = e.pageX;
        this.tmp_y_pos = e.pageY;
      },
      // 現在時刻から引数に渡した数値を startTime に代入
      setSubtractStartTime: function (Time) {
        var time = typeof Time !== "undefined" ? Time : 0;
        this.startTime = Math.floor(performance.now() - time);
      },
      // タイマーをスタートさせる
      startTimer: function () {
        // loop()内で this の値が変更されるので退避
        var vm = this;
        vm.isRunning = true;
        vm.setSubtractStartTime(vm.diffTime);
        // ループ処理
        (function loop() {
          vm.nowTime = Math.floor(performance.now());
          vm.diffTime = vm.nowTime - vm.startTime;
          vm.animateFrame = requestAnimationFrame(loop);
          if (vm.tmp_x_pos != "" && vm.tmp_y_pos != "") {
            vm.t_pos_arr.push({
              section: vm.num,
              mouseX: vm.tmp_x_pos,
              mouseY: vm.tmp_y_pos,
              timestamp: vm.diffTime,
            });
          }
        }());
      },
      // タイマーを停止させる
      stopTimer: function () {
        this.isRunning = false;
        this.isInterval = true
        cancelAnimationFrame(this.animateFrame);
        // console.log(this.t_pos_arr)
        console.log(this.c_pos_arr)
      },
    },
    filters: {
      // ゼロ埋めフィルタ 引数に桁数を入力する
      // ※ String.prototype.padStart() は IEじゃ使えない
      zeroPad: function (value, Num) {
        var num = typeof Num !== "undefined" ? Num : 2;
        return value.toString().padStart(num, "0");
      },
    },
    computed: {
      // 秒数を計算 (60秒になったら0秒に戻る)
      seconds: function () {
        return Math.floor(this.diffTime / 1000);
      },
      // ミリ数を計算 (1000ミリ秒になったら0ミリ秒に戻る)
      milliSeconds: function () {
        return Math.floor(this.diffTime % 1000);
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
