import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)
// 创建 vueRouter 对象实例
const router = new VueRouter({
  mode: 'history', // 路由模式
  base: process.env.BASE_URL, // 默认为‘/’
  routes
})

/**
 * 注册全局前置守卫
 */
// 需要登录后才能进入的页面
const permissionRoutes = ['/cart', '/orders']
// 进入每个页面前都会执行回调函数
router.beforeEach((to, from, next) => {
  // 判断即将进入的页面是否需要用户登录权限
  if (permissionRoutes.includes(to.path)) {
    // 判断是否登录，获取token来判断
    if (store.state.user.token) {
      // 如果有token就执行下一步
      next()
    } else {
      // 没有token,就跳转登录页面
      next('/login')
    }
  } else {
    next()
  }
})
export default router
