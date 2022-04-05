<template>
  <div class="detail" v-if="detail" :height="375">
      <template>
    <!-- 头 -->
        <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        >
        <!-- 分享按钮 -->
         <template #right>
           <van-icon name="share-o" size="24"
           @click="changeshare"
           >
           <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="options"
          cancel-text=" "
          :close-on-click-overlay="closeoverlay"
        />
        <template #options>
           <!-- <van-icon name="wechat" /> -->
        </template>
        </van-icon>
        </template>
    </van-nav-bar>
      </template>

    <van-swipe :autoplay="3000">
  <van-swipe-item
   v-for="photo in detail.photo"
   :key="photo.id"
    >
    <img v-lazy="photo.url" :style="{width: '100%', height: '100%'}" />
  </van-swipe-item>
</van-swipe>

 <!-- 标题、描述、价格等渲染 -->
<div>
   <div class="desc">
      <div class="title">
        <van-tag plain v-if="detail.isFreePostage" color="#f00">包邮</van-tag>
        {{ detail.title }}
      </div>
      <div class="price-container">
        <span class="price">￥{{ detail.price | money }}</span>
        <span class="origin-price">{{ detail.originPrice | money }}</span>
      </div>
      <div class="sale-num">
        月销量: {{ detail.saleNum }}
      </div>
    </div>
</div>

<!-- 滑动，谁谁谁买了啥 -->
<van-swipe style="height: 50px;"
:autoplay="2500"
vertical
:show-indicators="false"
>
  <van-swipe-item
  v-for="carouselList in carouselList"
  :key="carouselList.id"
  >
    <p class="sc">{{carouselList.avatar}}<span>{{carouselList.nickName}}</span>{{carouselList.desc}}</p>
  </van-swipe-item>
</van-swipe>

 <!-- 分割线 -->
    <van-rate  readonly />
    <van-divider>商品图文详情</van-divider>

    <!-- 图文详情 -->
    <div class="content">
      <img
        v-for="content in detail.descContentList"
        :key="content.photo.id"
        v-lazy="content.photo.url"
      />
    </div>

<!-- 加入购物车 -->
<van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon
  icon="cart-o"
   text="购物车"
  :badge="$store.state.cart.list.length"
  @click=" jumpToDetail"
    />
  <van-goods-action-icon icon="shop-o" text="店铺" dot/>
  <van-goods-action-button
  type="warning"
  text="加入购物车"
   @click="handleAddToCart(detail)"
  />

  <van-goods-action-button
  type="danger"
  text="立即购买"
  />
</van-goods-action>

  </div>
</template>

<script>
import { getDetail } from '@/api/detail'

export default {
  name: 'Detail',
  data () {
    return {
      detail: null,
      carouselList: [],
      // 分享面板
      showShare: false,
      options: [
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
    const result = await getDetail(this.$route.params.id)
    const { detail } = await getDetail(this.$route.params.id)
    this.detail = detail
    this.carouselList = result.carouselList
  },
  methods: {

    // 跳转到购物车
    jumpToDetail () {
      this.$router.push('/cart')
    },

    /**
     * 处理添加到购物车
     */
    handleAddToCart (prod) {
      if (this.$store.state.user.token) {
        // 构建
        const currentProduct = {
          id: prod.id,
          image: prod.image,
          title: prod.title,
          price: prod.price
        }
        // console.log(currentProduct)
        // console.log(this.$store)
        // // this.list.push(currentProduct)
        this.$store.dispatch('cart/addToCartAsync', currentProduct)
        this.$toast({
          type: 'success',
          message: '加入购物车成功'
        })
      } else {
        this.$toast({
          type: 'success',
          message: '登录账号以后才可以加购物车哟'
        })
        this.$router.push('/login')
      }
    },
    // 返回上一页
    onClickLeft () {
      this.$router.back()
    },
    // 分享
    changeshare () {
      this.showShare = !this.showShare
    }

  }

}
</script>

<style lang="less" scoped>
 .detail {
    .desc {
      padding: 12px;
      .title {
        font-size: 16px;
        font-weight: 700;
      }

      .price {
        color: #f00;
        font-size: 16px;
        font-weight: 700;
      }

      .origin-price {
        color: #ccc;
        font-size: 12px;
        text-decoration: line-through;
        margin: 0 12px;
      }
      .sale-num {
        text-align: right;
        color: #ccc;
      }
    }
    .content {
      img {
        width: 100%;
        display: block;
      }
    }
  }
      .sc{
      width: 100%;
      height: 30px;
      // font-size: 18px;
     color: red;
    }
</style>
