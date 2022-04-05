<template>
  <div id="app">
      <header>
        <router-view name="header"></router-view>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <router-view name="footer"></router-view>
      </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  main{
    width: 100%;
    overflow-x: hidden;
    margin-bottom:55px;
  }
@font-face {
  font-family: 'iconfont';  /* Project id 3285755 */
  src: url('//at.alicdn.com/t/font_3285755_0j0675r3vmcm.woff2?t=1648609675141') format('woff2'),
       url('//at.alicdn.com/t/font_3285755_0j0675r3vmcm.woff?t=1648609675141') format('woff'),
       url('//at.alicdn.com/t/font_3285755_0j0675r3vmcm.ttf?t=1648609675141') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}

// 重置样式
*{
  margin:0;
  padding: 0;
}
</style>
