<template>
  <b-nav-item-dropdown v-if="currentUser" right>
    <template v-slot:button-content>User</template>
    <b-dropdown-item href="#">Profile</b-dropdown-item>
    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
  </b-nav-item-dropdown>

  <b-navbar-nav v-else>
    <b-nav-item :to="{name: 'Login'}">{{$t('login')}}</b-nav-item>
  </b-navbar-nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBarAuth",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  }
};
</script>