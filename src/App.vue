<template>
  <div id="app">

    <router-view />
    
    <p style="text-align:center;height:39px;line-height:39px;background:#fff" v-show="fullLoadMore">
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中</span>
    </p>
    <p style="text-align:center;height:39px;line-height:39px;background:#fff" v-show="fullNoMore">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">无更多数据</span>
    </p>

    <!-- 分享弹窗 -->
    <!-- <transition name="bounce">
      <share-alert v-show='shareAlertFlag'></share-alert>
    </transition> -->

    <!-- 二维码弹窗 -->
    <!-- <transition name="bounce">
      <qrcode v-show="QRcodeAlertFlag"></qrcode>
    </transition> -->

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { jCookie, jLocalStorage, jSession } from './utils/storage.js'

export default {
  name: "App",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["fullLoadMore", "fullNoMore", "shareAlertFlag", "QRcodeAlertFlag"])
  },
  watch: {
    $route() {
      //马上分享弹窗，首页进来只弹一次
      if (jSession.get('shareAlert') == null && this.$route.name == 'index') {
        jSession.set("shareAlert", 1);
        this.$store.commit("SHARE_ALERTFLAG", true);
      }
    }
  },
  methods: {},
  mounted() {
    // this.$store.commit("FULL_LOADMORE", false);
    // this.$store.commit("FULL_NOMORE", false);
    // this.$store.commit("QRCODE_ALERTFLAG", false);
  }
};
</script>
<style lang="less">
@import "./style/common.less";
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
#app{
   background: #f1f2f3;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
