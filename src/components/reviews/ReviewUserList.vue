<template>
  <div v-if="reviews && reviews.docs.length > 0">
    <review-preview :showImage="true" v-for="(review, key) in reviews.docs" :key="key" :review="review" />

    <v-pagination
      v-model="currentPage"
      @input="change"
      :page-count="reviews.totalPages"
      :classes="BOOTSTRAP_PAGINATION_CLASSES"
    ></v-pagination>
  </div>
  <div v-else-if="reviews">
    {{$t('no_reviews')}}
  </div>
  <div v-else>
    <b-spinner variant="light" label="Loading..."></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";
import {
  PROFILE_REVIEWS_LOAD,
  PROFILE_REVIEWS_UNLOAD
} from "@/store/actions.types";
import ReviewPreview from "@/components/reviews/ReviewPreview";

export default {
  name: "ReviewUserList",
  components: {
    ReviewPreview
  },

  computed: {
    ...mapGetters({
      profile: "getProfile",
      reviews: "getProfileReviews"
    })
  },

  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  watch: {
    profile: function() {
      this.currentPage = 1;
      this.loadReviews();
    }
  },

  mounted() {
    this.loadReviews();
  },

  beforeDestroy() {
    this.unloadReviews();
  },

  methods: {
    loadReviews() {
      if (this.profile) {
        var data = {
          nickname: this.profile.nickname,
          page: this.currentPage
        };
        this.$store.dispatch(PROFILE_REVIEWS_LOAD, data);
      }
    },
    async unloadReviews() {
      this.$store.dispatch(PROFILE_REVIEWS_UNLOAD);
    },
    change() {
      this.loadReviews();
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>