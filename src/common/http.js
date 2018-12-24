/**
 * 对axios 封装
 * @author lch
 */

import Vue from 'vue'
import axios from 'axios'
import _config from './config'
import router from '../router/index'
import { jCookie } from '../utils/storage'
import store from '../store/index'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin);  //vux 提示插件
Vue.use(LoadingPlugin) //vux loading插件

axios.defaults.timeout = _config.timeout;
axios.defaults.baseURL =  _config.baseUrl;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {

    let TOKEN = jCookie.get('ACCESS_TOKEN') || '';

    Vue.$vux.loading.show();

    //统一添加请求头
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers['authorization'] = 'Bearer ' + TOKEN;

    return config
}, err => {
    return Promise(err)
})

/**
 * 响应的拦截器
 */
axios.interceptors.response.use(response => {
    
    Vue.$vux.loading.hide()   //隐藏loading

    if (response.status == 200 && response.data.success == true) {
        return response.data
    } else {
        //处理后台返回的code
        switch (response.data.code || response.data.status) {
            case 400:
                Alert('错误请求');
                break
            case 401:
                Alert('未授权,请重新登录')
                store.commit('CLEAR_ALL');
                router.replace({ name: 'login' });
                break
            case 403:
                Alert('未授权,请重新登录')
                store.commit('CLEAR_ALL');
                router.replace({ name: 'login' });
                break
            case 500:
                Alert('服务器异常')
                break
            case 501:
                Alert('请求参数异常')
                break
            default:
                Alert(`${res.message}`)
                break
        }
        return response.data;
    }
}, err => {
    Vue.$vux.loading.hide()   //隐藏loading
    return Promise.resolve(err.message)
})

function Alert(str) {
    Vue.$vux.toast.text(`${str}`, 'bottom');
}

export default axios;


