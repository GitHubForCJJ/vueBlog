
import Vue from 'vue';
// import ElementUI from 'element-ui';
import { Dialog, List, Pagination } from 'vant';
//import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './style/app.less';
import './style/common.less';
import router from './router';

// Vue.use(ElementUI);
Vue.use(List);
Vue.use(Dialog);
Vue.use(Pagination);


Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
