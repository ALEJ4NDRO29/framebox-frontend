import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth.module';
import layout from './layout/layout.module';
import profile from './profile/profile.module';
import review from './review/review.module';
import resource from './resource/resource.module';
import resourceAdmin from './resource/resourceAdmin.module';
import list from './list/list.module';
import suggestion from './suggestion/suggestion.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    layout,
    profile,
    resource,
    resourceAdmin,
    review,
    list,
    suggestion
  }
})
