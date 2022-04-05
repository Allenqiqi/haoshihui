<template>
  <div class="flash-sale">
    <div class="flash-product">
      <!-- 搜索框 分享-->
      <div class="search">
        <van-nav-bar
          title="限时抢购"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>

      <div class="share">
        <van-icon name="share-o"   @click="changeshare">
           <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="option"
          cancel-text=" "
          :close-on-click-overlay="closeoverlay"
        />
        </van-icon>
      </div>
    </div>

    <!-- 大图 -->
    <div class="banner">
      <img src="../../assets/deals.png" alt="">
    </div>

    <!-- 时间表 -->
    <van-tabs>
      <van-tab v-for="index in options" :key="index.time">
        <!-- 自定义title -->
        <template #title>
          <span>{{index.time}}</span>
          <span>即将开抢</span>
        </template>

        <!-- 内容 -->
        <van-card
          v-for="prod in products"
          :key="prod.id"
          :title="prod.title.substring(0,10)"
          :thumb="prod.image"
          @click="jumpToDetail(prod.id)"
        >
          <!-- 自定义标签 -->
          <template #tags>
            <span class="flash-discountPrice">
              ￥{{prod.price}}
            </span>
            <span class="flash-originPrice">
              ￥{{prod.originPrice}}
            </span>
          </template>

          <!-- 自定义价格 -->
          <template #price>
            <span class="flash-num">
              限量{{String(prod.saleNum).substring(0,3)}}件
            </span>
          </template>

          <!-- 自定义价格 -->
          <!-- 自定义价格 -->
          <template #num>
            <span class="flash-cart" @click="jumpToDetail(prod.id)">
              开抢提醒
            </span>
          </template>
        </van-card>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import {
  getFlash
} from '@/api/flash'
export default {
  name: 'Flash',
  data () {
    return {
      options: [
        { time: '10:00' },
        { time: '14:00' },
        { time: '18:00' },
        { time: '22:00' },
        { time: '明日10:00' }
      ],
      products: [], // 限时抢购商品
      isEnd: false, // 是否所有商品已查完
      nextIndex: 0, // 下一页推荐商品查询起始索引
      loading: true, // 商品列表中是否正在加载列表数据
      timeData: [], // 倒计时数据

      // 分享面板
      showShare: false,
      option: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      // 分享面板的遮罩层，点击遮罩层关闭
      closeoverlay: false
    }
  },
  async created () {
    const { list: products, isEnd, nextIndex } = await getFlash()
    console.log('flash:', products)

    this.nextIndex = nextIndex
    this.isEnd = isEnd
    this.loading = false
    this.products = products

    // 调用
    this.countDown()
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    jumpToDetail (id) {
      this.$router.push('/detail/' + id)
    },
    // 分享
    changeshare () {
      this.showShare = !this.showShare
    },
    countDown () { // 倒计时
      // 获取当前时间
      // const date = new Date()
      // const year = date.getFullYear()
      // const month = date.getMonth() + 1
      // const day = date.getDate()
      // const hours = date.getHours()
      // const minutes = date.getMinutes()
      // const seconds = date.getSeconds()

      // // 获取当前时间的时间戳
      // const now = date.getTime()

      // // 设置截止时间
      // const endDate = new Date(`${year}-${month}-${day} 10:00:00`)
      // const end = endDate.getTime()
      // // 时间差
      // const leftTime = end - now
      // // // 定义变量 d,h,m,s保存倒计时的时间
      // if (leftTime >= 0) {
      //   this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
      //   this.m = Math.floor((leftTime / 1000 / 60) % 60)
      //   this.s = Math.floor((leftTime / 1000) % 60)
      // }
      // console.log(this.s)
      // // 递归每秒调用countTime方法，显示动态时间效果
      // setTimeout(this.countTime, 1000)

      // console.log(now, end, leftTime)

      // console.log(year, month, date, hours, minutes, seconds)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.van-nav-bar,.van-hairline--bottom{
    width: 80%;
    float: left;
  }
  /deep/.van-icon,.van-icon-arrow-left,.van-nav-bar__arrow{
    color:#000;
    font-size: 17px;
    font-weight: 700;
  }
  /deep/.van-nav-bar__title{
    font-weight: 700;
    padding-left: 50px;
  }

  .share{
    width: 20%;
    height: 30px;
    padding-top: 15px;
    float: right;
  }
  // .flash-product{
  //   display: flex;
  // }
  /deep/.van-icon-share-o{
    float: right;
    margin-right: 20px;
  }

  /deep/.van-tab__text,.van-tab__text--ellipsis{
    display: flex;
    flex-direction: column;
    align-items:center;
    span:nth-of-type(1){
      font-weight: 700;
    }
  }

  /deep/.van-icon-arrow-left:before{
    color: black;
  }

  .flash-originPrice{
    text-decoration: line-through;
    color: #ccc;
    margin-left: 80px;
    font-size: 16px;
  }

  .flash-discountPrice{
    font-size: 16px;
    color: red;
  }

  /deep/.van-card__title{
    font-size: 16px;
  }

  .flash-cart{
    background-color: red;
    color: #fff;
    display: inline-block;
    padding: 6px 15px;
    border-radius: 3px;
  }

  .flash-num{
    display: inline-block;
    margin-top: 8px;
  }
</style>
