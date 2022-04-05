const API = {
  // TABS_API: '/xiongmao/api/tabs', // 所有分类
  TABS_API: 'http://162.14.108.31:3000/api/tabs',
  // TAB_API: '/xiongmao/api/tab' // 查询子分类的接口
  TAB_API: 'http://162.14.108.31:3000/api/tab',
  // 推荐商品渲染
  // LIB_API: '/xiongmao/api/tab/2/feeds',
  LIB_API: 'http://162.14.108.31:3000/api/tab/2/feeds',
  DETAIL_API: '/xiongmao/api/detail', // 商品详情接口
  MINE_API: 'http://162.14.108.31:3000/api/tab/2/feeds', // 推荐商品
  CODE_API: 'http://162.14.108.31:3000/api/sessions/code', // 获取验证码
  SESSIONS_API: 'http://162.14.108.31:3000/api/sessions' // 用户登录、退出接口
}
export default API
