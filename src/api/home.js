import request from '@/utils/request'
import API from './constant'

/**
 * 查询排行榜商品数据
 * @param {*} start
 * @returns
 */
export const getRanking = (start = 0) => request({
  url: API.RANKING_API + '?start=' + start
})

/**
 * 获取限时抢购商品
 * @param {*} start
 * @returns
 */
export const getFlashSale = (start = 0) => request({
  url: API.FLASH_SALE_API + '?start=' + start
})

/**
 * 获取推荐商品
 * @param {*} start
 * @returns
 */
export const getRecommend = (start = 0) => request({
  url: API.RECOMMEND_API + '?start=' + start
})
