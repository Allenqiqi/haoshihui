const cartModule = {
  namespaced: true,
  state: {
    // 保存购物车中的数据
    list: JSON.parse(localStorage.getItem('cart')) || [],
    purchased: JSON.parse(localStorage.getItem('order')) || [] // 已购买商品
  },
  getters: {
    // 计算是否所有商品都选中
    allChecked (state) {
      return state.list.every(prod => prod.checked)
    },
    // 计算金额
    totalMoney (state) {
      return state.list.reduce((sum, curr) => {
        if (curr.checked) {
          sum += curr.price * curr.amount * 100
        }
        return sum
      }, 0)
    }
  },
  mutations: {

    // 添加购物车
    addToCart (state, payload) {
      // 查询购物车中是否有当前选购的商品
      const has = state.list.some(prod => prod.id === payload.id)
      // 有，则修改数量，没有则追加到购物车数组中
      if (has) {
        state.list = state.list.map(prod => {
          const copy = { ...prod }
          if (copy.id === payload.id) {
            copy.amount += 1
          }
          return copy
        })
      } else {
        state.list.push({
          ...payload,
          amount: 1, // 商品数量默认为1
          checked: true // 默认加入购物车的商品是被选中的
        })
      }
    },

    // 删除购物车
    removeFromCart (state, payload) {
      state.list = state.list.filter(prod => prod.id !== payload.id)
    },
    // 修改数量
    modifyAmount (state, payload) {
      state.list = state.list.map(prod => {
        const copy = { ...prod }
        if (copy.id === payload.id) {
          copy.amount = payload.amount
        }
        return copy
      })
      console.log(state.list)
    },

    // 修改选中状态
    modifyChecked (state, payload) {
      state.list = state.list.map(prod => {
        const copy = { ...prod }
        if (copy.id === payload.id) {
          copy.checked = !copy.checked
        }
        return copy
      })
    },
    // 全选状态
    checkedAll (state, payload) {
      state.list = state.list.map(prod => {
        const copy = { ...prod }
        copy.checked = payload.checked
        return copy
      })
    },

    placedOrder (state, payload) {
      state.purchased = [...payload]
      state.list = state.list.filter(item => !item.checked)
    }
  },

  actions: {

    addToCartAsync (context, payload) {
      // 模拟发送网络请求向后端发送加入购物车商品的信息
      setTimeout(() => {
        context.commit('addToCart', payload)
      }, 1000)
    }

  },
  modules: {
  }

}
export default cartModule
