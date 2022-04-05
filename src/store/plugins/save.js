const savePlugin = store => {
  store.subscribe((mutation, state) => {
    // console.log(mutation, state)
    localStorage.setItem('cart', JSON.stringify(state.cart.list))
    localStorage.setItem('order', JSON.stringify(state.cart.purchased))
  })
}

// 导出
export default savePlugin
