// 移动端适配方案使用rem，根据设计稿宽度适配，基础值为100，  即在屏幕宽度为375时 1rem=100px
//页面布局可用px为单位，已经使用 postcss-pxtorem插件，将px转换为rem

(function (d, w) {
  // 基准大小
  const baseSize = 100
  function setRem() {
    // 当前页面宽度相对于 375 宽的缩放比例，可根据自己需要修改。
    const scale = d.documentElement.clientWidth / 375   //设计稿宽度为375宽
    // 设置页面根节点字体大小
    d.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  w.onresize = function () {
    setRem()
  }
})(document, window);

