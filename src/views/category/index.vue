<template>
  <div class="category">

<!-- 分类搜索框 -->
    <div class="search">
        <van-search  placeholder="搜索商品" />
    </div>

<!--分类搜索框下面的主体内容 -->
<div class="content">
<!-- 分类左侧导航 -->
  <van-sidebar v-model="activeKey">
  <van-sidebar-item
   v-for="item in categories" :key="item.id"
  :title="item.name"
  :to="`/category/category-list?id=${item.id}`"
  />
</van-sidebar>

<!-- 右侧 -->
<div class="category-list">
 <router-view />
</div>

  </div>
  </div>
</template>

<script>
import { getCategories } from '@/api/category'
export default {
  name: 'Category',
  data () {
    return {
      activeKey: 0,
      categories: []
    }
  },
  async created () {
    // 查询主分类
    const { list } = await getCategories()
    // console.log(list)
    // 因为第一个数据是今天推荐,我们不要,所以把它分割出去
    this.categories = list.slice(1)
    // console.log(this.categories)
    // 默认向第一个子分类进行跳转
    this.$router.push('/category/category-list?id=' + this.categories[0].id)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.content{
  width: 100%;
  height: auto;
  // background-color: red;
  display: flex;
  margin-bottom: 50px;
.category-list{
  flex: 1;
  // background: green;
}
}
</style>
