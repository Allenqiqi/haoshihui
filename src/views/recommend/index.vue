<template>
  <div class="recommend">
    <div class="flash-product">
      <!-- 搜索框 分享-->
      <div class="search">
        <van-nav-bar
          title="人气推荐"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>

      <div class="share">
        <van-icon name="share-o" />
      </div>
    </div>

    <!-- 大图 -->
    <div class="banner">
      <img src="../../assets/recommend.jpg" alt="">
    </div>

    <!-- 商品 -->
    <van-list
      v-model="loading"
      :finished="isEnd"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item v-for="prod in products" :key="prod.id" :icon="prod.image" @click="jumpToDetail(prod.id)">
          <template #text>
            <div class="van-ellipsis"><p>{{prod.title.substring(0,6)}}</p></div>
            <span class="recommend-price">￥{{prod.price}}</span>
          </template>
        </van-grid-item>
      </van-grid>

    </van-list>

  </div>
</template>

<script>
import { getRecommendProducts } from '@/api/recommend'
export default {
  name: 'Recommend',
  data () {
    return {
      products: [], // 推荐商品
      isEnd: false, // 是否所有推荐商品已查完
      nextIndex: 0, // 下一页推荐商品查询起始索引
      loading: true // 商品列表中是否正在加载列表数据
    }
  },
  async created () { // 实例创建后，立即发送网络请求
    try {
      const { list: products, isEnd, nextIndex } = await getRecommendProducts()

      this.isEnd = isEnd
      this.nextIndex = nextIndex
      this.products = products
      this.loading = false
    } catch (error) {
      console.error('有错误：', error)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    /**
     * 触底加载更多商品
     */
    async onLoad () {
      // 异步更新数据
      const { list, nextIndex, isEnd } = await getRecommendProducts(this.nextIndex)
      this.products = [
        ...this.products, // 浅拷贝，将原有 products 数组中的元素复制到新数组中
        ...list
      ]
      this.nextIndex = nextIndex
      this.isEnd = isEnd
      this.loading = false
    },
    /**
     * 调到详情页面
     * */
    jumpToDetail (id) {
      this.$router.push('/detail/' + id)
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
  /deep/.van-icon-share-o{
    float: right;
    margin-right: 20px;
  }

  /deep/.van-icon__image{
    width: 140px;
    height: 140px;
  }

  .recommend-price{
    color:rgba(255, 0, 54, 1);
    display: inline-block;
    width: 100%;
    font-size: 14px;
    text-align: left;
  }

  /deep/.van-ellipsis{
    display: inline-block;
    width: 100%;
    font-size: 14px;
    text-align: left;
  }

  /deep/.van-icon-arrow-left:before{
    color: black;
  }
</style>
