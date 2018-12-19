import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// ~  等于目录  src/view
//  meta 中 login 为1的页面需要登录，为0则不需要

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'index',
    component: () => import('~/home'),
    meta: {
      title: '首页',
      login: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('~/account/login'),
    meta: {
      title: '登录',
      login: 0
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('~/account/register'),
    meta: {
      title: '注册',
      login: 0
    }
  },
];

routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  mode: 'history',
  vase: __dirname,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 对于所有路由导航，简单地让页面滚动到顶部。
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

});

export default router
