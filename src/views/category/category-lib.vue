<template>
  <div class="category-lib">

<!-- 精选推荐头 -->
<van-nav-bar
:title="$route.meta.title"
left-text="返回"
left-arrow
 @click-left="onClickLeft"
>
  <template #right>
    <van-icon name="search" size="24"/>
  </template>
</van-nav-bar>

 <!-- 精选滚动 -->
<van-tabs>
  <van-tab v-for="item in categoriesall"
   :title="item.name"
   :key="item.id">
  </van-tab>
</van-tabs>

<!-- 下拉菜单 -->
<div class="mune">
<van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" />
  <van-dropdown-item v-model="value2" :options="option2" />
  <van-dropdown-item v-model="value3" :options="option3" />
   <van-dropdown-item v-model="value4" :options="option4" />
</van-dropdown-menu>
<div><van-icon name="apps-o" size="30px"
@click="showchange"
/></div>
</div>

    <!-- 商品列表渲染 -->
    <div v-show="showw">
    <van-card
    v-for="prod in products" :key="prod.id"
    :price="prod.price | money"
    :origin-price="prod.originPrice | money"
    :title="prod.title"
    :thumb="prod.image"
    @click="jumpToDetail(prod.id)"
    >
     <template v-slot:num>
          <span style="margin-right: 6px">月销量:{{ prod.saleNum }}</span>
     </template>
     <!-- 自定义描述下方的标签，显示优惠券、包邮 -->
        <template #tags>
          <van-tag plain type="primary" color="#f00" v-if="prod.couponValue" style="margin-right: 6px;">
            {{ prod.couponValue }}
          </van-tag>
          <van-tag plain type="primary" color="#f00" v-if="prod.isFreePostage">
            包邮
          </van-tag>
        </template>

           <!-- <template #footer>
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
    </template> -->
    </van-card>
</div>
    <div v-show="!showw">
    <van-grid :gutter="10" column-num="2">
        <van-grid-item
        v-for="item in products"
        :key="item.id"
        @click="jumpToDetail(item.id)"
        >
        <template #icon >
          <img class="likeimg" :src="item.image"/>
        </template>
        <template #text>
          <div class="girdprice">
            <p>{{item.title}}</p>
           <p><span>￥{{item.price | money}}</span><span>￥{{item.originPrice | money}}</span></p>
          </div>
        </template>
        </van-grid-item>
      </van-grid>
    </div>
 <van-divider>已经到底了</van-divider>

  </div>
</template>

<script>
import { getCategories, getCategorieslib } from '@/api/category'

export default {
  name: 'CategoryLib',
  data () {
    return {
      // 切换样式
      showw: true,
      categoriesall: [],
      // 推荐商品
      products: [],
      value1: 0,
      value2: 'a',
      value3: 'e',
      value4: '4',
      option1: [
        { text: '综合', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '销量', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '新品', value: 'e' },
        { text: '新品推荐', value: 'f' }
      ],
      option4: [
        { text: '价格', value: '4' },
        { text: '从高到低', value: '5' },
        { text: '从低到高', value: '6' }
      ]
    }
  },
  async created () {
    //   推荐商品tab还是用的熊猫的数据
    const result = await getCategories()
    // console.log(result)
    this.categoriesall = result.list
    // 推荐商品数据
    const { list } = await getCategorieslib()
    this.products = list
  },
  methods: {

    // 点击，返回上一页
    onClickLeft () {
      this.$router.back()
    },

    /**
     * 跳转到详情页面
     */
    jumpToDetail (id) {
      this.$router.push('/detail/' + id)
    },
    // 显示按钮
    showchange () {
      this.showw = !this.showw
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-icon van-icon-search{
  // nav-bar-icon-color:#ccc
  color: #ccc;
}
.mune{
    display: flex;
      .van-dropdown-menu{
    flex: 1;
  }
  .van-icon van-icon-apps-o{
    line-height: 43px;
  }
  }
   .likeimg{
    width: 130px;
  }
  .girdprice{
    p:nth-of-type(2){
      span:nth-of-type(1){
        font-size:18px;
        margin-right: 10px;
        color:red;
      };
      span:nth-of-type(2){
        text-decoration: line-through;
        color: #ccc;
      }
    }
  }

</style>
