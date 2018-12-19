import './common/rem'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/permission'
import _config from './common/config'
import http from './common/http'
import store from './store/index'
// import 'babel-polyfill'

// 注册全局组件与插件
import globalComponents from './globalComponents'
Vue.use(globalComponents)

//注入全局方法
Vue.prototype.$config = _config;
Vue.prototype.$http = http;
Vue.prototype.$moniBaseUrl = _config.moni.baseUrl;
Vue.prototype.$marketBaseUrl = _config.market.baseUrl;

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})


export default Vue;
