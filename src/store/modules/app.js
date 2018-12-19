import util from '../../common/util';
import { jCookie, jLocalStorage, jSession } from '../../utils/storage'

export default {
  state: {
    fullLoadMore: false, //上拉加载 loadMore
    fullNoMore: false, //暂无更多
    shareAlertFlag: false, //分享弹窗
    QRcodeAlertFlag: false, //二维码弹窗
    QRcodeUrl:'../../assets/QRcode.png', //分享海报
    userMobileType: util.mobileType(), //用户手机类型 1：安卓  2：iPhone
    isInApp: false, //是否嵌入app中
  },
  mutations: {
    FULL_LOADING(state, data) {
      state.fullLoading = data
    },
    FULL_LOADMORE(state, data) {
      state.fullLoadMore = data
    },
    FULL_NOMORE(state, data) {
      state.fullNoMore = data
    },
    SHARE_ALERTFLAG(state, data) {
      state.shareAlertFlag = data;
    },
    QRCODE_ALERTFLAG(state, data) {
      state.QRcodeAlertFlag = data;
    },
    QRCODE_URL(state, data) {
        state.QRcodeUrl = data;
    },
    IS_IN_APP(state, data) {
      state.isInApp = data;
    }
    
  }
}