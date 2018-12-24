import './common/rem'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/permission'
import _config from './common/config'
import http from './common/http'
import store from './store/index'
// import 'babel-polyfill'

import globalComponents from './globalComponents' // 注册全局组件与插件
Vue.use(globalComponents);

import filters from "./filter/filters";  //全局过滤器
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

//注入全局方法
Vue.prototype.$config = _config;
Vue.prototype.$http = http;



new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})


export default Vue;
