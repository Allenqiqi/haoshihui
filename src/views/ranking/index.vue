<template>
  <div class="ranking">
    <!-- 头部 -->
    <van-nav-bar
      left-text="排行榜"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 排行榜分类 -->
    <van-tabs v-model="activeName">
      <van-tab title="新品特卖榜" name="a">
        <van-card
          v-for="(prod,index) in newProducts"
          :key="prod.id"
          :tag="String(index+1)"
          :title="prod.title"
          :thumb="prod.image"
          @click="jumpToDetail(prod.id)"
        >
          <!-- 自定义描述下方标签 -->
          <template #tags>
            <span class="new-price">￥{{ prod.price | money}}</span>
          </template>

          <!-- 自定义价格 -->
          <template #price>
            <span class="new-tag">销售热度{{Number(prod.commodityId.substring(0,2))+25}}%</span>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="商品好评榜" name="b">
        <van-card
          v-for="(prod,index) in favoriteProducts"
          :key="prod.id"
          :tag="String(index+1)"
          :title="prod.title"
          :thumb="prod.image"
          @click="jumpToDetail(prod.id)"
        >
        <!-- 自定义描述下方标签 -->
          <template #tags>
            <span class="new-price">￥{{ prod.price | money}}</span>
          </template>

          <!-- 自定义价格 -->
          <template #price>
            <span class="new-tag">销售热度{{Number(prod.commodityId.substring(0,2))+25}}%</span>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="当季热卖榜" name="c">
        <van-card
          v-for="(prod,index) in hotProducts"
          :key="prod.id"
          :tag="String(index+1)"
          :title="prod.title"
          :thumb="prod.image"
          @click="jumpToDetail(prod.id)"
        >
        <!-- 自定义描述下方标签 -->
          <template #tags>
            <span class="new-price">￥{{ prod.price | money}}</span>
          </template>

          <!-- 自定义价格 -->
          <template #price>
            <span class="new-tag">销售热度{{Number(prod.commodityId.substring(0,2))+25}}%</span>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getNew, getFavorite, getHot } from '@/api/ranking'
export default {
  name: 'Ranking',
  data () {
    return {
      activeName: 'a',
      newProducts: [], // 排行榜新品
      favoriteProducts: [], // 排行榜好评
      hotProducts: [] // 排行榜热卖
    }
  },
  async created () {
    try {
      const [
        { value: { list: newProducts } },
        { value: { list: favoriteProducts } },
        { value: { list: hotProducts } }
      ] = await Promise.allSettled([
        getNew(),
        getFavorite(),
        getHot()
      ])
      this.newProducts = newProducts
      this.favoriteProducts = favoriteProducts
      this.hotProducts = hotProducts

      console.log(favoriteProducts)
      console.log(hotProducts)
    } catch (error) {
      console.log('有错误', error)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    jumpToDetail (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.van-nav-bar__text{
    color:#000;
    font-weight: 700;
    padding-left: 120px;
  }

  .new-tag{
    margin-top: 40px;
    padding: 5px;
    border: 1px solid red;
    background: rgba(253, 242, 242, 0.993);
    color: red;
    border-radius: 3px;
  }

  /deep/.van-icon-arrow-left:before{
    color: black;
  }

  .new-price{
    color:red;
    font-size: 16px;
  }
</style>
