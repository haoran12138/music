import Vue from 'vue';
import Vant from 'vant';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import 'vant/lib/index.css';
import './common/scss/common.scss';
import './common/scss/vant.scss';

Vue.use(Vant).use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
