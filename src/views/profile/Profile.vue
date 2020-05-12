<template>
  <div v-if="loading">
    <b-spinner variant="light" label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <h1>{{profile.nickname}}</h1>
    <profile-update-button
      v-if="currentUser && (currentUser.nickname === this.$route.params.nickname || currentUser.isAdmin)"
      :nickname="this.$route.params.nickname"
    />

    <profile-details />

    <div class="reviews">
      <h2>Reviews</h2>
      <review-user-list />
    </div>
  </div>
</template>

<script>
import { PROFILE_LOAD, PROFILE_UNLOAD, ALERT } from "@/store/actions.types";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ReviewUserList from "@/components/reviews/ReviewUserList";
import ProfileUpdateButton from "@/components/profile/ProfileUpdateButton";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    ProfileDetails,
    ProfileUpdateButton,
    ReviewUserList
  },

  computed: {
    ...mapGetters({
      profile: "getProfile",
      currentUser: "getCurrentUser"
    })
  },

  data() {
    return {
      loading: true
    };
  },

  async beforeRouteUpdate(to, from, next) {
    await this.unloadProfile();
    next();
    this.loadProfile();
  },

  mounted() {
    window.document.title = `${this.$route.params.nickname} - Framebox`;
    this.loadProfile();
  },

  beforeDestroy() {
    this.unloadProfile();
  },

  methods: {
    loadProfile(nickname = this.$route.params.nickname) {
      this.$store
        .dispatch(PROFILE_LOAD, nickname)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.$store.dispatch(ALERT, {
            content: "user_not_found",
            close: "ok"
          });
        });
    },

    async unloadProfile() {
      await this.$store.dispatch(PROFILE_UNLOAD);
    }
  }
};
</script>

<style scoped>
.reviews {
  margin-top: 25px;
}

</style>