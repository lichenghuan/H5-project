//路由拦截
import router from './index'
import { jCookie } from '../utils/storage'
import store from '../store/index';
router.beforeEach((to, from, next) => {
  store.commit("FULL_LOADMORE", false);
  store.commit("FULL_NOMORE", false);
  //判断登录
  if (to.meta.login) {
    if (jCookie.get('ACCESS_TOKEN')) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.name) {
    document.title = to.meta.title;
  }
})

export default router

