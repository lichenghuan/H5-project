<template>
  <div class="topBg">
    <div class="back" @click="$router.push({name:backRouteName})">
      <x-icon type="ios-arrow-left" size="24"></x-icon>
      <span>返回</span>
    </div>
    <span class='topTitle'>
      <slot></slot>
    </span>
  </div>

</template>
<script>
export default {
  name: "topBg",
  props: {
    backRouteName: {
      type: String,
      default: "index"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.topBg {
  position: relative;
  background-image: linear-gradient(90deg, #dec87a 0%, #e5b144 100%);
  height: 56px;
  .topTitle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0.15px;
  }
  .back {
    height: 25px;
    width: 62px;
    position: absolute;
    bottom: 15px;
    left: 0;
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
}
</style>
