const { defineConfig } = require('@vue/cli-service')
const pxtorem = require('postcss-pxtorem')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            pxtorem({
              rootValue: 37.5,
              propList: ['*']
            })
          ]
        }
      }
    }
  },
  // 服务器配置
  devServer: {
    port: 8080,
    // 反向代理
    proxy: {
      '/xiongmao': {
        target: 'http://www.xiongmaoyouxuan.com',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 修改路径
          '^/xiongmao': ''
        }
      }
    }
  }
})
