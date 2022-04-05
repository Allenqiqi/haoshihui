<template>
  <div class="orders">
        <van-tabs v-model="name">
            <!-- 全部订单 -->
            <van-tab title="全部" name="1">
                <div class="all-orders">
                    <van-cell-group>
                        <van-cell value="待发货">
                            <template #title>
                                订单编号：<span>11111111</span>
                            </template>
                        </van-cell>
                        <van-card
                            class="order-info"
                            desc="描述信息"
                            title="商品标题"
                            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                        >
                            <template #num>
                                <p class="goods-num">共<span>1</span>件商品 合计：￥<span>11</span></p>
                            </template>
                        </van-card>
                        <div class="all-but">
                            <button>取消订单</button>
                            <button>再次购买</button>
                        </div>
                    </van-cell-group>
                </div>
                <!-- 没有订单 -->
                 <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="没有订单"
                />
            </van-tab>
            <!-- 待付款订单 -->
            <van-tab title="待付款" name="2">
                <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="没有订单"
                />
            </van-tab>
            <!-- 待发货订单 -->
            <van-tab title="待发货" name="3">
                <div class="all-orders">
                    <van-cell-group>
                        <van-cell value="待发货">
                            <template #title>
                                订单编号：<span>11111111</span>
                            </template>
                        </van-cell>
                        <van-card
                            class="order-info"
                            desc="描述信息"
                            title="商品标题"
                            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                        >
                            <template #num>
                                <p class="goods-num">共<span>1</span>件商品 合计：￥<span>11</span></p>
                            </template>
                        </van-card>
                        <div class="all-but">
                            <button>取消订单</button>
                            <button>再次购买</button>
                        </div>
                    </van-cell-group>
                </div>
                <!-- 没有订单 -->
                 <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="没有订单"
                />
            </van-tab>
            <!-- 待收货订单 -->
            <van-tab title="待收货" name="4">
                <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="没有订单"
                />
            </van-tab>
            <!-- 待评价订单 -->
            <van-tab title="待评价" name="5">
                 <van-empty
                    class="custom-image"
                    image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="没有订单"
                />
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data () {
    return {
      name: ''
    }
  },
  created () {
    const id = this.$route.params.id
    this.name = id
  }
}
</script>

<style lang="less" scoped>
    // 空状态
    .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
    }
    // 全部订单
    .all-orders{
        margin-bottom: 20px;
        .van-cell__value{
            span{
                color: red;
            }
        }
        .order-info{
            background-color: #fff;
            border-top: 1px solid rgb(237, 236, 236);
            border-bottom: 1px solid rgb(237, 236, 236);
            .goods-num{
                font-size: 14px;
                color: black;
            }
        }
        .all-but{
        width: 100%;
        height: 50px;
        background-color: #fff;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        border-bottom: 1px solid rgb(237, 236, 236);
        button{
            width: 80px;
            height: 35px;
            font-size: 13px;
            margin-right: 15px;
            background-color: #fff;
            outline: none;
            border: none;
            border: 1px solid #ccc;
        }
    }
    }
</style>
