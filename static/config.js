
/**
 * 配置文件
 * @author JC
 */

window.urlConfig = {
    wsuri: 'ws://112.74.62.61:8093/websocket/market',//行情接口
    timeout: 100000,
    moni: {   //模拟盘接口
        baseUrl: 'http://192.168.1.111:9200',
        api: {
            getUserAsset: '/api/v1.0/trade/getUserAsset',   //首页 查资产
            getAccountInfo: '/api/v1.0/trade/getAccountInfo',   //查询页面 查资产
            getAiPageList: '/api/v1.0/award/getAiPageList',   //获取AI动态
        },
    },
    market: {  //平台接口
        baseUrl: 'http://192.168.1.111:8080/webapi',
        api: {
            login: '/api/v1/user/login',  //登录接口
            regist: '/api/v1/user/regist',  //注册接口
            get: '/api/v1/account/get',  //根据token获取用户信息
            findPwd: '/api/v1/user/findPwd',  //找回密码
            send: '/api/v1/sms/send',  //发送短信
        }
    }
};