import request from '@/utils/request'
import API from './paths'

/**
 * 查询所有分类数据
 */
export const getCategories = () => request({
  url: API.TABS_API
})

/**
 * 根据主分类 id 查询子分类数据
 * @param {*} id
 * @returns
 */
export const getSubCategories = id => request({
  url: API.TAB_API + '/' + id
})

/**
 * 推荐商品渲染
 */
export const getCategorieslib = () => request({
  url: API.LIB_API
})
