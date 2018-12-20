/**
 * 对axios 的封装
 * @author JC
 */

import Vue from 'vue'
import axios from 'axios'
import _config from './config'
import router from '../router/index'
import { jCookie, jLocalStorage, jSession } from '../utils/storage'
import store from '../store/index'
import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

axios.defaults.timeout = _config.timeout;


function Alert(str) {
    Vue.$vux.toast.text(`${str}`, 'bottom');
}


function detectionCode(res) {
    switch (res.code || res.status) {
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
}

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    let TOKEN = jCookie.get('ACCESS_TOKEN') || '';

    Vue.$vux.loading.show();

    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers['authorization'] = 'Bearer ' + TOKEN;

    if(config.url && config.method.toLowerCase()=='get'){
        if(config.url.indexOf("?")>0){
            config.url=config.url+"&_="+(new Date()).getTime()
        }else{
            config.url=config.url+"?_="+(new Date()).getTime()
        }
    }
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
        
        detectionCode(response.data)
        return response.data;
    }
    // return response
}, err => {

    Vue.$vux.loading.hide()   //隐藏loading

    var str = err.response.data.path;
    var index = str.lastIndexOf("\/");
    str = str.substring(index + 1, str.length);
    //判断，如果是getIsTradeOrAdd请求返回401或403的时候不跳到登录页

    if (err && err.response) {
        switch (err.response.status) {
            case 401:
                Alert(`未授权,请重新登录`)
                store.commit('CLEAR_ALL');
                if (str != 'getIsTradeOrAdd') {
                    router.replace({ name: 'login' });
                }
                break
            case 403:
                Alert(`未授权,请重新登录`)
                store.commit('CLEAR_ALL');
                if (str != 'getIsTradeOrAdd') {
                    router.replace({ name: 'login' });
                }

                break
            default:
                err.message = `连接错误${err.response.status}`
                Alert(`${err.message}`)
        }
    } else {
        Alert(`连接服务器失败`);
    }
    return Promise.resolve(err.message)
})

export default axios;