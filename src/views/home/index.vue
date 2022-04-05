<template>
  <div class="home">
     <!-- 搜索框 -->
    <van-sticky>
      <div class="search">
        <van-icon name="scan" />
        <van-search v-model="value" placeholder="搜索商品" @click="handleJumpToSearch"/>
        <van-icon name="chat-o" />
      </div>
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" v-if="banners.length">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img v-lazy="banner.image" class="banner-img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 中心 ----------------------------------------------------------------------->
    <div class="main-content">
      <!-- 限时抢购 -------------------->
      <div class="flash-sale" @click="jumpToFlash">
        <h3>限时抢购</h3>
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>

        <!-- 更多 -->
        <span @click="jumpToFlash">更多 > </span>
      </div>

      <!-- 商品 ------------------------>
      <div class="products">
        <!-- 限时抢购下的商品 -->
        <div class="flash-products" v-if="flashSale.length" >
          <div class="flash-card" v-for="n in flashSale" :key="n.id" @click="jumpToFlash">
            <img :src="n.image" alt="">
            <div class="van-ellipsis flash-price"><p>￥{{n.price}}</p></div>
            <!-- <p>{{n.title}}</p> -->
            <p class="flash-num">仅剩{{n.saleNum/100}}件</p>
          </div>

        </div>
      </div>

      <!-- 排行榜 人气推荐 数据渲染---------------------->
      <div class="ranking-list">
        <h3 @click="jumpToRanking">
          <span>排行榜</span>
          <span @click="jumpToRanking">更多 > </span>
        </h3>
        <div class="big-img" v-if="rankingPosterPic.length">
          <img :src="rankingPosterPic[0].image" alt="">
        </div>
        <!-- 小图 -->
        <div class="small-img" v-if="ranking.length">
          <div class="small-main" v-for="prod in ranking" :key="prod.id" @click="jumpToRanking">
            <img :src="prod.image" alt="" class="s-img">
            <div class="van-ellipsis"><p>{{prod.title}}</p></div>
            <p class="ranking-price">￥{{prod.price}}</p>
          </div>

        </div>

      </div>

      <div class="ranking-list">
        <h3 @click="jumpToRecommend">
          <span >人气推荐</span>
          <span @click="jumpToRecommend">更多 > </span>
        </h3>
        <div class="big-img" v-if="rankingPosterPic.length">
          <img :src="rankingPosterPic[1].image" alt="" >
        </div>
        <div class="small-img" v-if="poster.length">
          <div class="small-main" v-for="prod in poster" :key="prod.id" @click="jumpToRecommend">
            <img :src="prod.image" alt="" class="s-img">
            <div class="van-ellipsis"><p>{{prod.title}}</p></div>
            <p class="ranking-price">￥{{prod.price}}</p>
          </div>
        </div>
      </div>

      <!-- 推荐商品 --------------------------------------->
      <van-list
        v-model="loading"
        :finished="isEnd"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="recommend-products">
          <h3>为你推荐</h3>
          <div class="recommend-tab" v-if="recommend.length">
            <div class="recommend-product" v-for="prod in recommend" :key="prod.id" @click="jumpToDetail(prod.id)">
              <img :src="prod.image" alt="">
              <div class="van-ellipsis"><p>{{prod.title}}</p></div>
              <p class="recommend-price">￥{{prod.price}}</p>
            </div>
          </div>
        </div>
      </van-list>

    </div>

  </div>
</template>

<script>
import { getRanking, getFlashSale, getRecommend } from '@/api/home'
export default {
  name: 'Home',
  data () {
    return {
      time: 30 * 60 * 60 * 1000,
      value: '',
      banners: [], // 轮播图
      ranking: [], // 排行榜商品
      poster: [], // 人气推荐商品
      rankingPosterPic: [], // 排行榜和人气推荐的大图
      flashSale: [], // 限时抢购商品
      recommend: [], // 推荐商品
      isEnd: false, // 是否所有推荐商品已查完
      nextIndex: 0, // 下一页推荐商品查询起始索引
      loading: true // 商品列表中是否正在加载列表数据
    }
  },
  async created () {
    try {
      const [
        { value: { list: goods } },
        { value: { list: sale } },
        { value: { list: recommend, isEnd, nextIndex } }
      ] = await Promise.allSettled([
        getRanking(),
        getFlashSale(),
        getRecommend()
      ])
      this.ranking = goods.slice(0, 3) // 截取4件商品
      this.poster = goods.slice(4, 7) // 截取4件商品
      this.rankingPosterPic = goods.slice(10, 12) // 截取两件

      this.banners = sale.slice(4, 8)
      this.flashSale = sale.slice(0, 3) // 截取3件

      this.nextIndex = nextIndex
      this.isEnd = isEnd
      this.loading = false
      this.recommend = recommend
    } catch (error) {
      console.error('有错误：', error)
    }
  },
  methods: {
    /*
      触底加载更多商品
    */
    async onLoad () {
      // 异步更新数据
      // const { value: { list: products, nextIndex, isEnd } } = await getRecommend(this.nextIndex)
      const { list, nextIndex, isEnd } = await getRecommend(this.nextIndex)
      this.recommend = [
        ...this.recommend, // 浅拷贝
        ...list
      ]
      this.nextIndex = nextIndex
      this.isEnd = isEnd
      this.loading = false
      // console.log(result)
    },
    jumpToFlash () { // 跳转到限时抢购页面
      this.$router.push('/flash')
    },
    jumpToDetail (id) { // 调转到详情页面
      // 编程式导航
      console.log('id:', id)
      this.$router.push('/detail/' + id)
    },
    jumpToRanking () {
      this.$router.push('/ranking')
    },
    jumpToRecommend () {
      this.$router.push('/recommend')
      // console.log(111)
    },
    handleJumpToSearch () { // 点击跳转到搜索页面
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less" scoped>
  @red:rgba(255, 0, 54, 1);
  *{
    margin:0;
    padding: 0;
  }

  .home{
    .search{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    background-color:@red ;
    }
    .van-search{
      width: 300px;
      background-color:@red ;
      /deep/.van-icon,.van-icon-search{
        font-size: 24px;
        color:#ccc
      }
      /deep/.van-field__control{
        color: rgb(153, 153, 153);
        font-size: 16px;
      }
    }
    i{
      font-size: 27px;
      color:#fff;
    }

    // 轮播图
    /deep/.van-swipe, .van-swipe__track, .van-swipe-item{
      height: 150px;
      width: 90%;
      margin:0 auto;
      border-radius: 5px;
      .banner-img{
        width: 100%;
        height: 100%;
      }
    }
  }

  .flash-sale{
    display: flex;
    padding:5px 20px;
    margin:0 auto;
    align-items: center;
    background-color: #fff;
    h3{
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      font-size: 16px;
      color: #333333;
    }
    /deep/.van-count-down{
      margin:0 133px 0 10px;
    }
    span{
      font-size: 14px;
    }
  }

  // 倒计时自定义样式
  .colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: @red;
  }

  // 中心内容
  .main-content{
    width: 100%;
    background-color:rgb(226, 226, 226);
  }
  // 主要内容
  .products{
    width: 100%;
    margin: 0 auto 10px auto;
    .flash-products{
      width: 100%;
      display: flex;
      justify-content:space-evenly;
      padding: 5px;
      background-color:#fff;
      .flash-card{
        width: 30%;
        height: 165px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 100%;
          height: 107px;
        }

        .flash-price{
          width: 112px;
          height: 19px;
          font-size: 17px;
          color:@red;
          margin: 8px 0;
          font-family: 微软雅黑;
          text-align: center;
        }
        .flash-num{
          height: 19px;
          font-size: 17px;
          color: #ccc;
          line-height: 15px;
          margin: 0;
        }
      }

    }
  }

  .flash-sale{
    width: 100%;
    background-color: #fff;
  }

  .ranking-list{
    padding: 0 20px;
    background-color: #fff;
    margin-bottom: 10px;
    h3{
      height: 50px;
      line-height: 50px;
      span:nth-of-type(1){
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        font-size: 16px;
        color: #333333;
      }
      span:nth-of-type(2){
        font-size: 14px;
        float: right;
        font-weight: normal;
      }
    }
    .big-img{
      width: 100%;
      height: 115px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .small-img{
      padding: 10px 0;
      width: 100%;
      height: 165px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .small-main{
        width: 107px;
        display: flex;
        flex-direction: column;
        .s-img{
          width: 100%;
          height: 107px;
        }
        .ranking-price{
          font-size: 14px;
          color: @red;
        }
        div{
          padding: 10px 0;
          color:#333333;
        }
      }
    }
  }

  .recommend-products{
    background-color: #fff;
    h3{
      padding: 20px 20px;
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      font-size: 0.42667rem;
      color: #333333;
    }
    .recommend-tab{
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      .recommend-product{
        width: 50%;
        img{
          width: 165px;
          height: 165px;
        }
        .recommend-price{
          font-size: 14px;
          color: @red;
        }
        div{
          width: 165px;
          padding: 10px 0;
          color:#333333;
        }
      }
    }
  }

</style>
