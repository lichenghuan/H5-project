
/**
 * 配置文件
 * @author JC
 */

window.urlConfig = {
    wsuri: 'ws://112.74.62.61:8093/websocket/market',//
    timeout: 100000,
    moni: {   
        baseUrl: 'http://192.168.1.111:9200',
        api: {
            getUserAsset: '/api/v1.0/trade/getUserAsset',  
            getAccountInfo: '/api/v1.0/trade/getAccountInfo', 
            getAiPageList: '/api/v1.0/award/getAiPageList', 
        },
    },
    market: {  //
        baseUrl: 'http://192.168.1.111:8080/webapi',
        api: {
            login: '/api/v1/user/login',  //登录
            regist: '/api/v1/user/regist',  //注册
            get: '/api/v1/account/get',  //
            findPwd: '/api/v1/user/findPwd',  //找回密码
            send: '/api/v1/sms/send',  //发送
        }
    }
};