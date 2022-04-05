
const Plugin = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('username', JSON.stringify(state.user.userInfo))
    localStorage.setItem('password', JSON.stringify(state.user.userPass))
    localStorage.setItem('token', JSON.stringify(state.user.token))
  })
}
export default Plugin
