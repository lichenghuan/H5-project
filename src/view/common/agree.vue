<template>
  <!-- 同意服务条款 -->
  <div class='agree'>
    <check-icon :value.sync="agreeVal">
      <span class='agree'>本人已阅读，知晓并同意遵守</span>
      <span class='goldFont' @click.stop="changePage">服务条款</span>
    </check-icon>
  </div>
</template>
<script>
export default {
  name: "agree",
  props: {
    agree: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      agreeVal: this.agree
    };
  },
  methods: {
    changePage() {
      this.$router.push({ name: "serviceTerms" });
    }
  },
  watch: {
    agreeVal(oldVal, newVal) {
      this.$emit("agreeChange", this.agreeVal);
    }
  }
};
</script>
<style lang="less">
.agree {
  text-align: center;
  .agree {
    font-size: 12px;
    color: #8b8b8b;
  }
  .goldFont {
    font-size: 12px;
    color: #e89145;
    vertical-align: middle;
  }
  .weui-icon-success {
    font-size: 12px !important;
    color: #c39400 !important;
    position: relative;
    top: 1px;
  }

  .vux-check-icon > .weui-icon-success:before,
  .vux-check-icon > .weui-icon-success-circle:before {
    color: #c39400;
  }

  .weui-icon-circle {
    font-size: 12px !important;
    color: #c39400 !important;
    position: relative;
    top: 1px;
  }
}
</style>
