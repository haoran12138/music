import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import './common/scss/common.scss';
import './common/scss/vant.scss';
import App from './App.vue';
import router from './router';

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
