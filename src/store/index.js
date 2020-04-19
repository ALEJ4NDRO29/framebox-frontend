import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth.module';
import layout from './layout/layout.module';
import profile from './profile/profile.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    layout,
    profile
  }
})
