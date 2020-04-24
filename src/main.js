import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vPagination from 'vue-plain-pagination'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './style.css';
import { ApiService } from './common/api.service';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faStar, faMusic, faGamepad, faCouch, faFilm,
  faSearch, faEye, faEyeSlash, faEdit
} from '@fortawesome/free-solid-svg-icons'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component('v-pagination', vPagination);

/**
 *  Utilizar:
 *  <font-awesome-icon icon="bars" />
 */
library.add([
  faStar, faFilm, faMusic, faGamepad, faCouch,
  faSearch, faEye, faEyeSlash, faEdit]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

ApiService.init();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
