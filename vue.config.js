const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  //开启代理服务器
  devServer: {
    proxy: {
          //发送ajax请求时应该带的前缀
        '/api': {
          target: 'http://localhost:8088',
          //请求时是否改变请求源（请求的发出者host）
          changeOrigin: true
        },
    }
  }
})
