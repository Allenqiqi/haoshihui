<template>
  <div class="order">
    <!-- navbar -->
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 分割线 -->
    <van-divider />

    <!-- 地址栏 -->
    <div class="address">
      <h3>
        <span>呱呱 </span>
        <span>1386509342</span>
      </h3>
      <p>广东省深圳市南山区西丽镇沙河西路12号丽新花园6栋1502号</p>
    </div>

    <!-- 分割线 -->
    <van-divider dashed :style="{marginBottom:'10px', borderColor:'red'}" ></van-divider>

    <!-- 商品清单 -->
    <div class="order-sheet" @click="show = true">
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item v-for="prod in sheet" :key="prod.id" :icon="prod.image" @click="show = true" />
      </van-grid>
      <div class="product-amount" @click="show = true">
        <span>共{{totalAmount}}件商品</span>
        <van-icon name="arrow" />
      </div>

    </div>

    <!-- 遮罩层中自定义的功能 -->
    <van-action-sheet v-model="show">
      <van-card
        v-for="prod in list"
        :key="prod.id"
        :num="prod.amount"
        :price="prod.price | money"
        :title="prod.title.substring(0,10)"
        :thumb="prod.image"
      />
      <van-button @click="show = false">确认</van-button>
    </van-action-sheet>

    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
    />
    </van-popup>

    <!-- 订单费用详情 -->
    <div class="order-info">
      <p>
        <span>商品金额</span>
        <span>￥{{totalMoney | money}}</span>
      </p>
      <p>
        <span>活动优惠</span>
        <span>-￥0.00</span>
      </p>
      <p v-if="!chosenCoupon">
        <span>优惠券</span>
        <span>-￥{{valueDesc | money}}</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥0.00</span>
      </p>
    </div>

    <!-- 留言区 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言，50字以内"
      show-word-limit
    />

    <!-- 去付款 -->
    <van-submit-bar :price="total" button-text="去付款" @submit="onSubmit" />
  </div>
</template>

<script>
const coupon = {
  available: 2,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}

export default {
  name: 'Order',
  data () {
    return {
      show: false,
      actions: [], // 遮罩层里面的商品清单数据
      list: [], // 获取购物车中选中的商品
      sheet: [], // 展示在页面的三件商品
      chosenCoupon: -1, // 优惠券
      coupons: [coupon], // 优惠券
      disabledCoupons: [coupon], // 优惠券
      showList: false, // 优惠券
      valueDesc: 1.5, // 优惠券价格
      message: '', // 留言
      totalFee: null // 合计
    }
  },
  computed: {
    totalAmount () { // 总数量
      return this.list.reduce((sum, curr) => {
        sum += curr.amount
        return sum
      }, 0)
    },
    totalMoney () { // 总金额
      return this.list.reduce((sum, curr) => {
        sum += curr.price * curr.amount
        return sum
      }, 0)
    },
    total () {
      return this.totalCost()
    }
  },
  created () {
    this.list = this.$store.state.cart.list
    this.list = this.list.filter(order => order.checked)
    this.actions = this.list
    this.sheet = this.list.slice(0, 3)
    // console.log(this.coupons)
  },
  methods: {
    onClickLeft () {
      // 返回上一页
      this.$router.back()
    },
    onCancel () {
      // Toast('取消')
      console.log(111)
    },
    onChange (index) { // 优惠券
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) { // 优惠券
      this.coupons.push(coupon)
    },
    onSubmit () {
      // this.$router.push('')
      // this.$store.state.
      this.$store.state.cart.purchased = [
        ...this.list
      ]
      // localStorage.setItem('order', JSON.stringify(this.$store.state.cart.purchased))
      // this.$store.state.cart.list
      // console.log(this.$store.state.cart.purchased)
      this.$store.commit('cart/placedOrder', this.list)
      this.$toast({
        type: 'success',
        message: '付款成功'
      })
      setTimeout(() => {
        this.$router.push('/cart')
      }, 2000)
    },
    totalCost () {
      if (!this.chosenCoupon) {
        this.totalFee = (this.totalMoney - this.valueDesc) * 100
        return this.totalFee
      } else {
        this.totalFee = this.totalMoney * 100
        return this.totalFee
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .order{
    background-color: #f0f0f0;
  }
  /deep/.van-icon-arrow-left:before{
    color: black;
  }

  /deep/.van-divider,.van-divider--hairline{
    border-color:rgb(125, 125, 125);
    margin:0;
  }

  /deep/.van-icon__image{
    width: 100%;
    height: 100%;
  }

  /deep/.van-grid{
    width: 70%;
  }

  .order-sheet{
    display: flex;
    align-items: center;
    // padding-right: 20px;
    margin-bottom: 10px;
  }

  .product-amount{
    text-align: center;
    font-size: 16px;
    color: rgb(136, 136, 136);
    margin-right: 10px;
  }

  /deep/.van-button--normal{
    width: 100%;
    background-color: red;
    color: #fff;
  }

  /deep/.van-card__price-currency,.van-card__price-integer,.van-card__price-decimal{
    color: red;
  }

  .address{
    padding-bottom: 10px;
    p,h3{
      width: 90%;
      margin:0 auto;
      height: 30px;
      line-height: 30px;
    }
  }
  .address,.order-sheet{
    background-color: #fff;
  }

  /deep/.van-cell,.van-cell--clickable,.van-coupon-cell{
    margin-bottom: 10px;
  }

  .order-info{
    background-color: #fff;
    margin-bottom: 10px;
    p{
      width: 92%;
      margin: 0 auto;
      height: 25px;
      line-height: 35px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
    }
  }

  /deep/.van-submit-bar__text{
    width: 60%;
    text-align: left;
  }

  /deep/.van-submit-bar__button--danger{
    width: 40%;
  }
</style>
