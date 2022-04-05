import request from '@/utils/request'
import API from './paths'

/**
 * 根据 id 查询商品详情数据
 * @param {*} id
 * @returns
 */
export const getDetail = id => request({
  url: API.DETAIL_API,
  params: {
    id
  }
})
