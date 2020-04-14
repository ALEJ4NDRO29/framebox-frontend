import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './style.css';
import { ApiService } from './common/api.service';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

ApiService.init();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
