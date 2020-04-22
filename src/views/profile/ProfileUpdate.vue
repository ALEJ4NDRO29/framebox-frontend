<template>
  <div v-if="profile">
    <b-row>
      <b-col cols="12" lg="8" offset-lg="2">
        <h1>{{$t('profile_update')}}</h1>
        <profile-update-form />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm";
import {
  PROFILE_UPDATE_LOAD,
  PROFILE_UPDATE_UNLOAD
} from "@/store/actions.types.js";
import { mapGetters } from "vuex";

export default {
  name: "ProfileUpdate",
  components: {
    ProfileUpdateForm
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      profile: "getProfileUpdating"
    })
  },

  mounted() {
    this.loadProfile();
  },

  beforeDestroy() {
    this.$store.dispatch(PROFILE_UPDATE_UNLOAD);
  },

  methods: {
    loadProfile() {
      // todo: if currentUser / admin
      var nickname = this.$route.params.nickname;

      if (nickname === this.currentUser.nickname) {
        this.$store.dispatch(PROFILE_UPDATE_LOAD, nickname);
      } else {
        this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
