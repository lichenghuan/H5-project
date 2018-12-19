/**
 * 自定义组件，以插件的方式接入到应用程序上下文中
 * */

//以下是导入组件的动作
import topHeader from "~/common/topHeader";
import nothing from "~/common/nothing";
import infiniteScroll from 'vue-infinite-scroll'
// import shareAlert from '~/other/shareAlert';
// import QRcode from '~/other/QRcode';

// import vueLazyLoad from 'vue-lazyload'    //注册全局懒加载

//以下是导入插件的动作

import {
  Swiper,
  SwiperItem,
  Tab,
  TabItem,
  Sticky,
  LoadMore,
  Flexbox,
  FlexboxItem,
  Actionsheet,
  XInput,
  CheckIcon,
  Selector,
  Confirm,
  Alert,
  Icon,
  Toast,
  ToastPlugin,
  LoadingPlugin,
  Loading,
  InlineLoading,
  Group,
  Cell,
  XAddress,
  XTextarea,
} from 'vux'


const install = function (Vue, options) {
  //  注册全局组件
  Vue.component('topHeader', topHeader)  //公共头部
  Vue.component('nothing', nothing)       //暂无数据
  // Vue.component('shareAlert', shareAlert)     //分享弹窗
  // Vue.component('qrcode', QRcode)     //分享二维码

  //注册全局插件
  Vue.component('Tab', Tab)
  Vue.component('TabItem', TabItem)
  Vue.component('Sticky', Sticky)
  Vue.component('LoadMore', LoadMore)
  Vue.component('Flexbox', Flexbox)
  Vue.component('FlexboxItem', FlexboxItem)
  Vue.component('Actionsheet', Actionsheet)
  Vue.component('XInput', XInput)
  Vue.component('CheckIcon', CheckIcon)
  Vue.component('selector', Selector)
  Vue.component('confirm', Confirm)
  Vue.component('alert', Alert)
  Vue.component('icon', Icon)
  Vue.component('loading', Loading)
  Vue.component('toast', Toast)
  Vue.component('inline-loading', InlineLoading)
  Vue.component('Group', Group)
  Vue.component('Cell', Cell)
  Vue.component('XAddress', XAddress)
  Vue.component('XTextarea', XTextarea)
  Vue.component('swiper', Swiper)
  Vue.component('swiper-item', SwiperItem)


  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)

  Vue.use(infiniteScroll)

  //300毫秒延迟
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
  // 使用FastClick 时，input框在ios上点击输入调取手机自带输入键盘不灵敏，有时候甚至点不出来。而安卓上完全没问题。这个原因是因为FastClick的点击穿透。解决方法如下
  FastClick.prototype.onTouchEnd = function (event) {
    if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "text") {
      event.preventDefault();
      return false;
    }
  }

}

export default install
