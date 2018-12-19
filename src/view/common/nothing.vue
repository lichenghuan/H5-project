<template>
  <div class='nothing'>

    <div class='nothigBox'>
      <img src="../../assets/nothing.png" alt="">
      <span>{{msg}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "nothing",
  props: {
    msg: {
      //用户排行
      type: String,
      default: '暂无数据'
    }
  }
};
</script>

<style scoped lang='less'>
.nothing {
  position: relative;
  height: 188px;
  .nothigBox {
    width: 100px;
    height: 88px;
    text-align: center;
    .transCenter();
    > img {
      width: 100px;
      height: 62px;
      margin-bottom: 6px;
    }
    > span {
      font-size: 12px;
      color: #8b8b8b;
      letter-spacing: 0.1px;
    }
  }
}
</style>