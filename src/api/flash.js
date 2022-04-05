import request from '@/utils/request'
import API from './constant'

/**
 * 查询限购商品
 * @param {*} start
 * @returns
 */
export const getFlash = (start = 0) => request({
  url: API.FLASH_SALE_API + '?start=' + start
})
