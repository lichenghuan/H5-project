<template>
  <!-- 用户奖励公共头部 -->
  <div class="mineHeader">
    <div class="topBg">
      <div class="topTitleBox">
        <div class="back" @click="$router.push({name:'index'})">
          <x-icon type="ios-arrow-left" size="24"></x-icon>
          <span>返回</span>
        </div>
        <div class='topTitle'>
          <slot name='title'></slot>
        </div>
      </div>

    </div>

    <!-- 已登录 -->
    <div class="centerBox" v-if="$store.getters.token">
      <div class="userImg">
        <img :src="$store.getters.userData.avter" alt="">
      </div>
      <div class="account">{{$store.getters.userData.phone | phoneFilter}}</div>

      <div class='lrBox'>
        <div class="prizeLogo">
          <img src="../../assets/rankingList/rankingList.png" alt="">
        </div>
        <div v-if="isShowRank">
            <div v-if="userRK<1">排名：未上榜</div>
            <div style="margin-right:10px" v-else>排名：{{userRK}} </div>
        </div>
        <div v-else>
            <div style="margin-right:10px" >排名：-- </div>
        </div>
      </div>

      <div v-if="isShowPrize">
        <div class='receivePrize' v-if="winFlag" @click="$router.push({path:'/receivePrize'})">领取奖品</div>
        <div class='receivePrize2' v-else>下次比赛再接再厉</div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="centerBox" v-else>
      <div class="userImg">
        <img :src="userImg" alt="">
      </div>
      <div class="account">-</div>
      <div class='lrBox'>
        <div class="prizeLogo">
          <img src="../../assets/rankingList/rankingList.png" alt="">
        </div>
        <div>排名：--</div>
      </div>
    </div>
    <div class="bottomBg">
    </div>
  </div>
</template>

<script>
export default {
  name: "mineHeader",
  props: {
    userRK: {
      //用户排行
      type: Number,
      default: 0
    },
    isShowPrize: {
      type: Boolean,
      default: false
    },
    isShowRank:{
        type:Boolean,
        default:true
    }
  },
  filters: {
    phoneFilter(p) {
      return p.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
    },
  },
  data() {
    return {
      userImg: require("../../assets/indexImg/icon-user2.png"),
      winFlag: false
    };
  },
  methods: {
    //当前用户是否中奖
    getAwardInfo() {
      this.$http.get(this.$moniBaseUrl + this.$config.moni.api.getAwardInfo).then(res => {
        if (res['data']) {
          this.winFlag = true
        } else {
          this.winFlag = false
        }
      });
    }
  },
  created() {
    this.$store.getters.token && this.getAwardInfo();
  }
};
</script>

<style scoped lang='less'>
.mineHeader {
  position: relative;
  overflow: hidden;
  height: 150px;
  .topBg {
    box-sizing: border-box;
    padding: 13px 7px 0;
    height: 95px;
    background-image: linear-gradient(90deg, #dec87a 0%, #e5b144 100%);
    .topTitleBox {
      position: relative;
      height: 25px;
      .back {
        height: 25px;
        width: 70px;
        > svg {
          vertical-align: middle;
          fill: #fff;
        }
        > span {
          vertical-align: middle;
          font-size: 14px;
          color: #fff;
          letter-spacing: 0.12px;
        }
      }
      .topTitle {
        .transCenter();
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0.15px;
      }
    }
  }
  .centerBox {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -43px);
    box-sizing: border-box;
    height: 88px;
    width: 360px;
    background: #fff;
    z-index: 6;
    padding: 14px 10px 14px 27px;
    > div {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #434343;
    }
    .lrBox {
      .fr();
      > div {
        display: inline-block;
        height: 60px;
        line-height: 60px;
      }
      .prizeLogo {
        // height: 33px;
        // width: 22px;
        margin-right: 5px;
        > img {
          height: 33px;
          width: 22px;
        }
      }
    }
    .userImg {
      height: 60px;
      width: 60px;
      // background: #000;
      margin-right: 10px;
      > img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
    }
    .account {
      height: 60px;
      line-height: 60px;
      margin-right: 38px;
    }

    .receivePrize {
      position: absolute;
      right: 20px;
      bottom: 4px;
      font-size: 14px;
      color: #2980b9;
      letter-spacing: 0.12px;
      text-decoration: underline;
    }
    .receivePrize2 {
      position: absolute;
      right: 10px;
      bottom: 4px;
      font-size: 14px;
      // color: #2980b9;
      letter-spacing: 0.12px;
      // text-decoration: underline;
    }
  }
  .bottomBg {
    height: 35px;
    background: #f1f2f3;
  }
}
</style>