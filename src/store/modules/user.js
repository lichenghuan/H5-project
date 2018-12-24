
import { jCookie, jLocalStorage, jSession } from '../../utils/storage'

export default {
  state: {
    userData: {},
    token: '',
    refresh_token: '',
    expires_in: 0,
  },
  mutations: {
    USER_DATA(state, value) {
      state.userData = value
      jLocalStorage.set('USER_DATA', value);
    },
    ACCESS_TOKEN(state, value) {
      state.token = value
      jCookie.setDefault('ACCESS_TOKEN', value)
    },
    REFRESH_TOKEN(state, value) {
      state.refresh_token = value
      jCookie.setDefault('REFRESH_TOKEN', value)
    },
    EXPIRESIN(state, value) {
      state.expires_in = value
      jCookie.setDefault('EXPIRESIN', value)
    },
    CLEAR_ALL(state) {
      jCookie.remove('ACCESS_TOKEN');
      jLocalStorage.remove('USER_DATA');
      this.commit("USER_DATA", {});
      this.commit("ACCESS_TOKEN", '');
    }
  }
}