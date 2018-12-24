/**
 * 环境的切换
 * @author lch
 */

const config = {
    wsuri: 'ws://122.33.11.22:1234/websocket/market',//websocket
    timeout: 100000,
    baseUrl: 'http://192.168.1.111:9200',
    api: {
        getUserAsset: '/api/v1/trade/getUserAsset',
        getAccountInfo: '/api/v1/trade/getAccountInfo',
        getAiPageList: '/api/v1/award/getPageList',
    }
};

if (process.env.NODE_ENV == 'development') { //开发环境   
    config.baseUrl = 'http://192.168.1.111:9200'; //打包前使用的url
} else if (process.env.NODE_ENV == 'production') { //生产环境  
    // config.moni.baseUrl = 'http://pro.com/web2';     //打包后的使用的url
}

export default config;