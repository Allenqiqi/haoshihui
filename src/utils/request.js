import axios from 'axios'
import { Toast } from 'vant'

// baseURL：在请求的所有接口前拼接这种基本url字符串
const baseURL = ''

// 创建 axios 实例
const service = axios.create({
  baseURL,
  timeout: 10000 // 请求接口时的超时时间
  // withCredentials: true, // 是否跨域携带凭证，如 cookie
})

// 请求拦截
service.interceptors.request.use(config => {
  // 在请求头中携带 token 传递到服务端进行认证
  // TODO::::::::
  // config.headers.token = token

  // 加载提示
  Toast.loading({
    message: '加载中...',
    duration: 0
  })

  return config
}, err => {
  Toast.clear()
  return Promise.reject(err)
})

// 响应拦截
service.interceptors.response.use(response => {
  // 关闭加载提示
  Toast.clear()

  // response.status 在 2xx 状态码时，表示请求成功
  if (response.status >= 200 && response.status < 300) {
    // response.data 中保存的是后端接口返回的数据
    const { code, data } = response.data
    // 判断后端接口规范
    if (code === 200) {
      return data
    }
  }

  // token 出现异常后的响应拦截处理
  // TODO:::::::::::::

  const error = new Error('请求接口异常')
  error.reason = response
  Toast.fail({
    message: '请求接口异常...'
  })
  return Promise.reject(error)
}, err => {
  Toast.fail({
    message: '请求接口异常:' + err.message
  })
  return Promise.reject(err)
})

// 导出创建的 axios 实例
export default service
