import request from '@/utils/request'
import API from './constant'

/**
 * 查询人气推荐商品
 * @param {*} start
 * @returns
 */
export const getRecommendProducts = (start = 0) => request({
  url: API.RECOMMEND_API + '?start=' + start
})
