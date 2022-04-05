<template>
  <van-tabbar v-model="active" active-color="rgba(255, 0, 54, 1)">
    <van-tabbar-item name="home" icon="wap-home">
      <router-link to="/home">
        首页
      </router-link>
    </van-tabbar-item>
    <van-tabbar-item name="search" icon="bars">
      <router-link to="/category">
        分类
      </router-link>
    </van-tabbar-item>
    <van-tabbar-item name="friends" icon="shopping-cart">
      <router-link to="/cart">
        购物车
      </router-link>
    </van-tabbar-item>
    <van-tabbar-item name="setting" icon="manager">
      <router-link to="/mine">
        我的
      </router-link>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
