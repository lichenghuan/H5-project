<template>
  <!-- 分割线 -->
  <div class="divider">
    <flexbox>
      <flexbox-item>
        <div class="flexD flexD1"></div>
      </flexbox-item>
      <flexbox-item :span="3">
        <div class="flexD flexD2">
          <slot name='cTitle'></slot>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flexD flexD3"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.divider {
  height: 40px;
  background: #fff;
  overflow: hidden;
  padding: 0 20px;
  .flexD {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #c39400;
    letter-spacing: 0.12px;
  }
  .flexD1,
  .flexD3 {
    height: 1px;
    background: #c39400;
  }
}
</style>