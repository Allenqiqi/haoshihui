<template>
  <div class="nav-bar">
        <van-nav-bar
            :title="$route.meta.title"
            left-text="返回"
            left-arrow
            @click-left="backTo"
        />
  </div>
</template>

<script>
export default {
  name: 'navBar',
  methods: {
    // 返回上一页面
    backTo () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
 /deep/.van-nav-bar__text{
    color: black;
    }
.van-nav-bar /deep/.van-icon{
    color:black ;
}
</style>
