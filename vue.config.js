// vue.config.js
const vueConfig = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      console.log(args);
      args[0].title = 'Title'
      return args
    })
  },
  // 其他配置
  lintOnSave: false
}

module.exports = vueConfig;