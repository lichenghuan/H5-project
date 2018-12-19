<template>
  <!-- 排行 -->
  <div class='rankingsBox'>
    <div class='rankings' v-for="(item,i) in rankingsData" :key="i">
      <div class='leftBox'>
        <span v-if="item.ranking>3">{{item.ranking}}</span>
        <img v-if="item.ranking==1" src="../../assets/rankingList/No1.png" alt="">
        <img v-if="item.ranking==2" src="../../assets/rankingList/No2.png" alt="">
        <img v-if="item.ranking==3" src="../../assets/rankingList/No3.png" alt="">
      </div>
      <div class='rightBox'>
        <div class='rightltBox'>
          <img :src="item.avatarSmall" alt="">
          <span class='account'>{{item.phone}}</span>
          <span v-if="isFlag" class='percentage'>{{item.profitRateStr}}</span>
          <span v-if="isFlag" class='count'>{{item.giftName}}</span>
          <span v-else class='profit'>收益率：
            <span>{{item.profitRateStr}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankings",
  props: {
    isFlag: {
      type: Boolean,
      default: true
    },
    rankingsData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods:{



    
  }
};
</script>

<style scoped lang='less'>
.rankingsBox {
  .rankings {
    height: 54px;
    box-sizing: border-box;
    padding: 0 15px;
    > div {
      float: left;
    }
    .leftBox {
      width: 26px;
      height: 100%;
      font-size: 14px;
      line-height: 54px;
      text-align: center;
      color: #434343;
      letter-spacing: 0.12px;
      margin-right: -26px;
      > img {
        width: 18px;
        height: 27px;
      }
    }
    .rightBox {
      width: 100%;
      box-sizing: border-box;
      padding-left: 26px;
      height: 100%;
      .rightltBox {
        position: relative;
        height: 100%;
        overflow: hidden;
        width: 100%;
        line-height: 54px;
        border-bottom: 1px solid #b6b6b6;
        > img {
          margin-left: 4px;
          position: relative;
          top: -2px;
          width: 31px;
          height: 31px;
          margin-right: 11px;
        }
        > span {
          font-size: 14px;
        }
        .account {
          color: #434343;
          letter-spacing: 0.12px;
        }
        .percentage {
          position: absolute;
          top: 50%;
          left: 60%;
          transform: translate(-50%, -50%);
          color: #ff5a00;
          letter-spacing: 0.12px;
        }
        .count {
          // margin-left: 26px;
          .fr();
          color: #c39400;
          letter-spacing: 0.12px;
        }
        .profit {
          color: #434343;
          .fr();
          letter-spacing: 0.12px;
          > span {
            color: #ee6723;
          }
        }
      }
    }
  }
}
</style>