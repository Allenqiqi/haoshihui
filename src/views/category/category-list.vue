<template>
  <div class="category-list">
      <!-- 上面的大图 -->
<div class="bigimg"><img src="https://gw.alicdn.com/imgextra/i3/O1CN01Aq7brs1KNeyyozBnm_!!6000000001152-2-tps-356-141.png" /></div>
   <!-- 分类子页面 -->
<van-grid :gutter="10" column-num="3">
  <van-grid-item v-for="category in CategoriesList" :key="category.id"
  :icon="category.imageUrl"
   :text="category.title"
   @click="jumpToDetail"
   />
</van-grid>
  </div>
</template>

<script>
import { getSubCategories } from '@/api/category'
export default {
  name: 'CategoryList',
  data () {
    return {
      CategoriesList: []
      // bigimg: []
    }
  },
  // 钩子函数并不能检测到每次点击改变
  // created () {
  //   console.log(this.$route)
  // }
  watch: {
    //
    $route: {
      async handler (newVal, oldVal) {
        const { id } = newVal.query
        // 根据id查询子分类数据id
        const result = await getSubCategories(id)
        // console.log(result)
        this.CategoriesList = result.categories
        // console.log(this.CategoriesList)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    jumpToDetail () {
      this.$router.push('/categorylib')
    }
  }
}
</script>

<style lang="less" scoped>
.bigimg{
    width: 100%;
    height: 116px;
    // background: yellow;
    margin-bottom: 10px;
    img{
      width:100%;
      height:100%;
    }
  }
</style>
