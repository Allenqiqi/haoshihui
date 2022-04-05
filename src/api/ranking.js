import request from '@/utils/request'
import API from './constant'

/**
 * 查询限购商品的新品商品
 * @param {*} start
 * @returns
 */
export const getNew = () => request({
  url: API.RANK_API + '?start=20'
})

/**
 * 查询限购页面的好评商品
 * @returns
 */
export const getFavorite = () => request({
  url: API.RANK_API + '?start=140'
})

/**
 * 查询限购页面的热卖商品
 * @returns
 */
export const getHot = () => request({
  url: API.RANK_API + '?start=180'
})
