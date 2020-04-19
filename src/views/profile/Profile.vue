<template>
  <div v-if="loading">
    <b-spinner variant="light" label="Loading..."></b-spinner>
  </div>
  <div v-else>
    <h1>{{this.$route.params.nickname}}</h1>
    <profile-details />
    <review-list v-if="1===1" />
  </div>
</template>

<script>
import { PROFILE_LOAD, PROFILE_UNLOAD, ALERT } from "@/store/actions.types";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ReviewList from "@/components/reviews/ReviewList";

export default {
  name: "Profile",
  components: {
    ProfileDetails,
    ReviewList
  },

  data() {
    return {
      loading: true
    };
  },

  mounted() {
    this.loadProfile();
  },

  beforeDestroy() {
    this.unloadProfile();
  },

  methods: {
    loadProfile() {
      this.$store
        .dispatch(PROFILE_LOAD, this.$route.params.nickname)
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

    unloadProfile() {
      console.log("unload");
      this.$store.dispatch(PROFILE_UNLOAD);
    }
  }
};
</script>