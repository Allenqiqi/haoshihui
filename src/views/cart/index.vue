<template>
  <div class="cart">

    <!-- 购物车表头，用的精选的 -->
    <van-nav-bar
    :title="$route.meta.title"

    >
      <template #right>
        <van-icon name="search" size="24" @click="jumpToSearch"/>
      </template>
    </van-nav-bar>

      <!-- 加入进购物车的商品 -->
     <van-swipe-cell
     v-for="prod in $store.state.cart.list"
     :key="prod.id"
     >
        <van-card
            :price="prod.price | money"
            desc="描述信息"
            :title="prod.title"
            class="goods-card"
        >

        <!-- 复选框 -->
        <template #thumb>
            <van-checkbox
            checked-color="#ee0a24"
            :value="prod.checked"
            @click="handleChangeCheck(prod.id)"
            >
            </van-checkbox>
            <div
            class="van-image"
            style="width: 75%; height: 100%;">
            <img :src="prod.image" class="van-image__img" style="object-fit: cover;">
          </div>
        </template>

        <!-- 步进器 -->
        <template #num>
          <van-stepper
               :value="prod.amount"
               @change="handleChangeAmount($event, prod.id)"
          />
        </template>
        </van-card>

        <template #right>
            <van-button
            square text="删除"
             type="danger"
             class="delete-button"
             @click="handleRemove(prod.id)"
              />
        </template>
     </van-swipe-cell>

     <!-- 购物车为空的时候 -->
     <div v-if="$store.state.cart.list.length===0">
            <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车没有商品"
      />
       <van-divider class="likefont">猜你<span>(❤ ω ❤)</span>喜欢</van-divider>

       <van-grid :gutter="10" column-num="2">
        <van-grid-item
        v-for="like in like"
        :key="like.id"
        @click="jumpclick(like.id)"
        >
        <template #icon >
          <img class="likeimg" :src="like.image"/>
        </template>
        <template #text>
          <p>{{like.title}}</p>
        </template>
        </van-grid-item>
      </van-grid>
    <van-divider class="likefont">哎呀没有更多了</van-divider>

     </div>

    <van-submit-bar
      v-if="$store.state.cart.list.length!=0"
      :price="totalMoney"
      button-text="提交订单"
      @submit="jumpToOrder"
      class=""
    >
      <van-checkbox
      :value="allChecked"
      @click="handleCheckAll({checked: !allChecked})"
      >
        全选
      </van-checkbox>
</van-submit-bar>
  </div>
</template>

<script>
// 猜你喜欢的商品
import { getCategorieslib } from '@/api/category'
export default {
  name: 'Cart',
  data () {
    return {
      // 猜你喜欢
      like: []
    }
  },
  computed: {
    allChecked () {
      return this.$store.getters['cart/allChecked']
    },
    totalMoney () {
      return this.$store.getters['cart/totalMoney']
    },
    cart () {
      return this.$store.state.cart.list
    }
  },
  async created () {
    // console.log('购物车：', this.$store)
    // 猜你喜欢
    const { list } = await getCategorieslib()
    this.like = list.slice(14)
  },
  methods: {
    handleRemove (id) {
      this.$store.commit('cart/removeFromCart', { id })
    },
    // 修改商品数量
    handleChangeAmount (amount, id) {
      // console.log(amount, id)
      this.$store.commit('cart/modifyAmount', { amount, id })
    },
    // 修改复选框选中状态
    handleChangeCheck (id) {
      this.$store.commit('cart/modifyChecked', { id })
    },
    // 全选
    handleCheckAll () {
      this.$store.commit('cart/checkedAll', { checked: !this.allChecked })
    },
    jumpToSearch () {
      this.$router.push('/search')
    },
    // 跳去详情页面
    jumpclick (id) {
      this.$router.push('/detail/' + id)
    },
    jumpToOrder () { // 跳转到订单页面
      const result = this.$store.state.cart.list.some(item => item.checked)
      // console.log(result)
      if (result) {
        this.$router.push('/order')
      } else {
        this.$toast({
          type: 'fail',
          message: '请勾选要购买的商品'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar{
    bottom: 50px;
}
 .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }

  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }

  /deep/ .van-card__thumb {
    display: flex;
    width: 120px;
  }
  /deep/ .van-checkbox {
    margin-right: 6px;
  }
  .likeimg{
    width: 130px;
  }
  .likefont{
    color: red;
    span{
      color: red;
    }
  }
</style>
