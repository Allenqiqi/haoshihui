import request from '@/utils/request'
import API from './paths'

/**
 * 注册页面获取验证码
 */
export const getCode = phone => request({
  url: API.CODE_API + '/' + phone
})

/**
 * 用户注册完成后登录
 */
export const loginAsync = (phone, code) => request({
  url: API.SESSIONS_API,
  method: 'post',
  data: {
    phone,
    code
  }
})
