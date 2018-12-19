/**
 * 统一的项目getters映射管理表
 * */

import { jCookie, jLocalStorage, jSession } from '../utils/storage'

const getters = {
  /* ************ app ****************/
  fullLoadMore: state => state.app.fullLoadMore,  // 上拉加载 loadMore
  fullNoMore: state => state.app.fullNoMore,  // 暂无更多
  shareAlertFlag: state => state.app.shareAlertFlag,  //分享弹窗
  QRcodeAlertFlag: state => state.app.QRcodeAlertFlag,  //二维码弹窗
  QRcodeUrl:state => state.app.QRcodeUrl, //分享海报
  userMobileType: state => state.app.userMobileType,  //用户手机类型 1：安卓  2：iPhone
  isInApp: state => state.app.isInApp,  //是否嵌入app中

  /* *************** user ****************/
  userData: state => JSON.stringify(state.user.userData) == "{}" ? jLocalStorage.get('USER_DATA') : state.user.userData,
  token: state => state.user.token == '' ? jCookie.get('ACCESS_TOKEN') : state.user.token,
  refresh_token: state => state.user.refresh_token == '' ? jCookie.get('REFRESH_TOKEN') : state.user.refresh_token,
  expires_in: state => state.user.expires_in == 0 ? jCookie.get('EXPIRESIN') : state.user.expires_in,

}
export default getters
