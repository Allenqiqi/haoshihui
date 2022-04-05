/**
 * 静态路由配置
 */
import Home from '@/views/home'
import Category from '@/views/category'
import CategoryList from '@/views/category/category-list'
import CategoryLib from '@/views/category/category-lib'
import Detail from '@/views/category/details/details'
import Cart from '@/views/cart'
import Tabbar from '@/components/tab-bar'
import Navbar from '@/components/nav-bar'
import Mine from '@/views/mine'
import Login from '@/views/login'
import Register from '@/views/register'
import Flash from '@/views/flash'
import Ranking from '@/views/ranking'
import Recommend from '@/views/recommend'
import Search from '@/views/search'
import Setup from '@/views/mine/setUp'
import Order from '@/views/order'
import Orders from '@/views/mine/orders'

const routes = [
  // 重定向
  {
    path: '/',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    components: {
      default: Home,
      footer: Tabbar
    }
  },
  // 商品分类
  {
    path: '/category',
    name: 'category',
    components: {
      default: Category,
      footer: Tabbar
    },
    children: [{
      path: 'category-list',
      component: CategoryList,
      meta: {
        title: '子分类'
      }
    }]
  },
  // 我的页面
  {
    path: '/mine',
    name: 'mine',
    components: {
      default: Mine,
      footer: Tabbar
    }

  },
  // 订单记录页面
  {
    path: '/orders/:id',
    name: 'orders',
    components: {
      header: Navbar,
      default: Orders
    },
    meta: {
      title: '我的订单'
    }
  },
  // 设置页面
  {
    path: '/setup',
    name: 'setup',
    components: {
      header: Navbar,
      default: Setup
    },
    meta: {
      title: '设置'
    }
  },
  // 精选推荐
  {
    path: '/categorylib',
    name: 'categorylib',
    components: {
      // header: NavBar,
      default: CategoryLib
    },
    meta: {
      title: '精选推荐'
    }
  },
  // 商品详情页
  {
    path: '/detail/:id', // 动态路径参数
    name: 'detail',
    components: {
      // header: NavBar,
      default: Detail
    },
    meta: {
      title: '商品详情'
    }
  },
  // 购物车页面
  {
    path: '/cart',
    name: 'cart',
    components: {
      // header: NavBar,
      default: Cart,
      footer: Tabbar
    },
    meta: {
      title: '我的购物车'
    }
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    components: {
      header: Navbar,
      default: Login
    },
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      header: Navbar,
      default: Register
    },
    meta: {
      title: '注册'
    }
  },
  {
    path: '/order',
    name: 'Order',
    components: {
      default: Order
    },
    meta: {
      title: '填写订单'
    }
  },
  {
    path: '/flash',
    name: 'flash',
    component: Flash
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/mine',
    name: Mine,
    component: Mine
  }

]

export default routes
