import { loginAsync } from '@/api/register'
export default {
  namespaced: true, // 命名空间
  state: {
    userInfo: JSON.parse(localStorage.getItem('username')) || '',
    userPass: JSON.parse(localStorage.getItem('password')) || '',
    token: JSON.parse(localStorage.getItem('token')) || ''
  },
  mutations: {
    //   用户登录
    loginSuccess (state, payload) {
      state.userInfo = payload.phone
      state.token = payload.token
      state.userPass = payload.pass
    },
    // 用户退出登录
    resetUser (state) {
      state.userInfo = null
      state.userPass = null
      state.token = null
    }
  },
  actions: {
    //   异步请求登录
    async loginAction (context, payload) {
      const result = await loginAsync(payload.phone, payload.code)
      payload.token = result.token
      if (result.userInfo) {
        context.commit('loginSuccess', payload)
        return true
      } else {
        context.commit('resetUser')
        return false
      }
    }
  }

}
