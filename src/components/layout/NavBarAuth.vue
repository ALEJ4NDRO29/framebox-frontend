<template>
  <b-nav-item-dropdown v-if="currentUser" right>
    <template v-slot:button-content>{{currentUser.nickname}}</template>

    <b-dropdown-item :to="{name: 'Profile', params: { nickname: currentUser.nickname } }">{{$t('profile')}}</b-dropdown-item>
    <b-dropdown-item @click="logout()">{{$t('logout')}}</b-dropdown-item>
  </b-nav-item-dropdown>

  <b-navbar-nav v-else>
    <b-nav-item :to="{name: 'Login'}">{{$t('login')}}</b-nav-item>
  </b-navbar-nav>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT_USER } from "@/store/actions.types";

export default {
  name: "NavBarAuth",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT_USER);
    }
  }
};
</script>