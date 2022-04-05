<template>
  <div class="mine">
    <!-- 用户信息 -->
      <div class="header">
        <div class="meInfo" v-if="this.$store.state.user.userInfo">
            <div class="me-img">
                <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="">
            </div>
            <div class="me-name">
              <p class="name">{{userName}}</p>
              <div class="sign-in">每日签到</div>
            </div>
        </div>
        <div class="meInfo" v-else>
            <p class="dl" @click="goToLogin">请登录</p>
        </div>

        <div class="install">
          <van-icon name="setting-o" size='25px' color="#fff" @click="goToSetUP"/>
          <van-icon name="chat-o" size="25px" color="#fff"/>
        </div>
      </div>

      <!-- 我的订单 -->
      <van-cell-group inset
        @click="goToOrder(1)"
      >
        <van-cell title="我的订单" is-link size="50px"/>
      </van-cell-group>
      <div class="order">
        <div @click="goToOrder(2)">
          <i class="iconfont" >&#xe76f;</i>
          <span>待付款</span>
        </div>
       <div @click="goToOrder(3)">
          <i class="iconfont">&#xe706;</i>
           <span>待发货</span>
        </div>
        <div @click="goToOrder(4)">
           <i class="iconfont">&#xe604;</i>
           <span>待收货</span>
        </div>
        <div @click="goToOrder(5)">
          <i class="iconfont">&#xe600;</i>
          <span>待评价</span>
        </div>
       <div>
          <i class="iconfont">&#xe622;</i>
          <span>售后服务</span>
       </div>
      </div>

      <!-- 常用功能 -->
      <van-cell-group>
        <van-cell title="常用功能" />
      </van-cell-group>
      <div class="fn">
        <div class="fn1">
          <div>
          <i class="iconfont icon1">&#xe65a;</i>
          <span>优惠券</span>
        </div>
        <div>
          <i class="iconfont icon2">&#xe8ba;</i>
          <span>我的收藏</span>
        </div>
        <div>
          <i class="iconfont icon3">&#xe636;</i>
          <span>积分中心</span>
        </div>
        <div>
          <i class="iconfont icon4">&#xe606;</i>
          <span>账户安全</span>
        </div>
        </div>
        <div class="fn2">
            <div>
              <i class="iconfont icon1">&#xe630;</i>
              <span>在线客服</span>
            </div>
            <div>
              <i class="iconfont icon2">&#xe605;</i>
              <span>帮助中心</span>
            </div>
            <div>
              <i class="iconfont icon3">&#xe662;</i>
              <span>意见反馈</span>
            </div>
            <div></div>
        </div>
      </div>

      <!-- 为你推荐 -->
      <div class="recommend">
          <p class="title">为你推荐</p>
          <van-grid :gutter="10" column-num="2" icon-size="130px">
              <van-grid-item
                  v-for="item in list"
                  :key="item.id"
                  :icon="item.image"
                  @click="handleToDetails(item.id)"
              >
              <template #text>
                  <div class="van-multi-ellipsis--l2" :style="{marginTop:'15px'}">
                    {{item.title}}
                  </div>
              </template>
              </van-grid-item>
          </van-grid>
          <van-divider>已经到底了</van-divider>
      </div>
  </div>
</template>

<script>
import { getMine } from '@/api/mine'

export default {
  name: 'Mine',
  data () {
    return {
      list: [] // 推荐数据
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userInfo
    }
  },
  // 获取推荐的商品数据
  async created () {
    const { list } = await getMine()
    this.list = list.slice(0, 8)
  },
  methods: {
    // 前往登录页面
    goToLogin () {
      this.$router.push('/login')
    },
    // 前往设置页面
    goToSetUP () {
      this.$router.push('/setup')
    },
    // 前往订单页面
    goToOrder (id) {
      if (this.$store.state.user.token) {
        this.$router.push('/orders/' + id)
      } else {
        this.$router.push('/login')
      }
    },
    handleToDetails (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
  // 用户头部信息
  .header{
    width: 100%;
    height: 150px;
    background-color: red;
    display: flex;
    justify-content: space-between;
    .dl{
      font-size: 17px;
      color: #fff;
      margin-left: 30px;
      margin-top: 30px;
    }
    .meInfo{
      width: 200px;
      height: 100%;
      display: flex;
      align-items: center;
      .me-img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-left: 10px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .me-name{
        width: 110px;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .name{
          font-size: 17px;
          color: #fff;
        }
        .sign-in{
          width: 80px;
          height: 20px;
          border: 1px solid #fff;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    .install{
      width: 80px;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
    }
  }
  // 我的订单
  .me-older{
    width: 100%;
    background-color: #fff;
  }
  .order{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #e4e3e3;
    margin-bottom: 10px;
    div{
      width: 60px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .iconfont{
        font-size: 30px;
        color: #727171;
      }
      span{
        font-size: 14px;
        color: #727171;
      }
    }
  }
// 常用功能
.fn{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin-bottom:20px;
  .fn1{
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #e4e3e3;
    div{
      width: 60px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .iconfont{
        font-size: 30px;
      }
      .icon1{
        color: rgb(233, 144, 144);
      }
      .icon2{
        color: rgb(233, 210, 167);
      }
      .icon3{
        font-size: 35px;
        color:rgb(231, 231, 156)
      }
      .icon4{
        color: antiquewhite;
      }
      span{
        font-size: 14px;
        color: #727171;
      }
    }
  }
  .fn2{
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{
      width: 60px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .iconfont{
        font-size: 30px;
      }
      .icon1{
        color: rgb(109, 109, 250);
      }
      .icon2{
        color: rgb(109, 109, 250);
      }
      .icon3{
        font-size: 32px;
        color:rgb(109, 109, 250)
      }
      .icon4{
        color: antiquewhite;
      }
      span{
        font-size: 14px;
        color: #727171;
      }
    }
  }
}
// 为你推荐
.recommend{
  width: 100%;
  .title{
    font-size: 15px;
    padding-left: 20px;
    margin-bottom: 10px;
  }
}
</style>
