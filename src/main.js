
import Vue from 'vue';
import { Dialog, List, Form, Pagination, Button, Field, Toast,Image as VanImage ,Lazyload,Uploader  } from 'vant';

import 'vant/lib/index.css';
import App from './App.vue';
import './style/app.less';
import './style/common.less';
import router from './router';


//Vue.use(ElementUI);
Vue.use(List);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Uploader);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
