<template>
  <div class="set-up">
        <van-cell  is-link class="info" v-if="$store.state.user.userInfo">
            <template #title>
                <div class="info-img">
                    <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
                    {{$store.state.user.userInfo}}
                </div>
            </template>
        </van-cell>
         <van-cell
            title="未登录"
            is-link
            v-else
            @click="goToLogin"
        />
        <van-cell title="收货地址" is-link />
        <van-cell title="账户安全" is-link />
        <van-cell title="意见反馈" is-link />
        <van-cell title="清除缓存" is-link />
        <van-cell title="关于我们" is-link />
        <van-cell title="分享APP" is-link />
        <button
            class="quit"
            @click="removeUser"
        >
        退出
        </button>
  </div>
</template>

<script>
export default {
  name: 'setUp',
  methods: {
    //   前往登录页面
    goToLogin () {
      this.$router.push('/login')
    },
    // 退出登录
    removeUser () {
      this.$store.commit('user/resetUser')
      this.$router.push('/mine')
    }
  }
}
</script>

<style lang="less" scoped>
.set-up{
    display: flex;
    flex-direction: column;
    .info{
       .info-img{
           display: flex;
           align-items: center;
          img{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
          }
       }
    }
    .quit{
        height: 40px;
        font-size: 15px;
        margin-top: 20px;
        background-color: rgb(245, 245, 245);
        outline: none;
        border: none;
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>
