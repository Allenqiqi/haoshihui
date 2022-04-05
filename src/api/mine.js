import request from '@/utils/request'
import API from './paths'

/**
 * 获取用户信息页面的推荐商品
 */
export const getMine = () => request({
  url: API.MINE_API
})
