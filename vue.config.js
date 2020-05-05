module.exports = {
    configureWebpack:{
      externals: {
         vue: 'Vue',
         'vue-router':'VueRouter',
         axios: 'axios',
         vant:'vant',
         qiniu:'qiniu'
      }
    }
}