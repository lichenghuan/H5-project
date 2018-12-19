<template>
  <div class='topHeader'>
    <div class="loginTitle">
      <span>
        <slot></slot>
      </span>
      <div class='closeIcon' @click="$router.push({path:'/'})">
        <x-icon type="ios-close-empty" size="40"></x-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "topHeader",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.topHeader {
  .loginTitle {
    position: relative;
    height: 56px;
    background: #fff;
    font-size: 18px;
    color: #000000;
    line-height: 56px;
    letter-spacing: 3px;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #cdcdcd;
    .closeIcon {
      > svg {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
