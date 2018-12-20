/**
 * 环境的切换
 * @author lch
 */

const config = window.urlConfig;


if (process.env.NODE_ENV == 'development') { //开发环境   
    config.moni.baseUrl = 'http://192.168.1.111:9200'; //打包前使用的url
    config.market.baseUrl = 'http://192.168.1.111:8080/webapi';

    // require('../utils/vconsole'); //H5调试面板

} else if (process.env.NODE_ENV == 'production') { //生产环境  
    // config.moni.baseUrl = 'http://pro.com/web2';     //打包后的使用的url
    // config.market.baseUrl = 'http://pro.com/web1'; 

    // require('../utils/vconsole'); //H5调试面板
}




export default config;