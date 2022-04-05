<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @touchstart.native.stop="show = true"
      />
    </form>

    <!-- 分割线 -->
    <van-divider />
    <!-- 历史搜索 -->
    <div class="history">
      <h3>历史搜索</h3>
      <div class="small-tags">
        <span class="tags" v-for="tag in history" :key="tag" @click="jumpToCategoryLib">{{tag}}</span>
      </div>
    </div>

    <!-- 大家都在搜 -->
    <div class="everybody">
      <h3>大家都在搜</h3>
      <div class="small-tags" >
        <span class="tags" v-for="tag in everybody" :key="tag" @click="jumpToCategoryLib">{{tag}}</span>
      </div>
    </div>

    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="value"
      :show="show"
      :maxlength="6"
      @blur="show = false"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      show: false,
      history: ['水杯', '中性笔', '热水保温壶', '电动牙刷', '洗护套餐', '薄款牛仔裤', '冰糖雪梨'],
      everybody: ['毛巾浴巾', '按摩椅', '电饭煲', '冰糖', '黑人牙膏', '眼霜', '化妆棉', '笔记本电脑']
    }
  },
  methods: {
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      this.$router.push('/home')
    },
    jumpToCategoryLib () {
      this.$router.push('/categorylib')
    }
  }
}
</script>

<style lang="less" scoped>
  h3{
    font-weight: normal;
    font-size: 18px;
    color: #64636380;
    padding-bottom: 10px;
  }
  .history,.everybody{
    width: 90%;
    margin: 0 auto;
  }

  .small-tags{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .tags{
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    color: rgb(130, 130, 130);
    font-size: 15px;
    margin-bottom: 15px;
  }
</style>
