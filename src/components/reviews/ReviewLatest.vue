<template>
  <div v-if="reviews">
    <h2>{{$t('recently_reviews')}} </h2>
    <review-preview :showImage="showImage" v-for="(review, key) in reviews.docs" :key="key" :review="review" />
  </div>
  <div v-else>
    <!-- <b-spinner variant="light" label="Loading..."></b-spinner> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  REVIEWS_LATEST_LOAD,
  REVIEWS_LATEST_UNLOAD
} from "@/store/actions.types";
import ReviewPreview from "@/components/reviews/ReviewPreview";

export default {
  name: "ReviewLatest",
  props: {
    showImage: Boolean
  },
  components: {
    ReviewPreview
  },

  computed: {
    ...mapGetters({
      reviews: "getLatestReviews"
    })
  },

  mounted() {
    this.loadReviews();
  },

  beforeDestroy() {
    this.unloadReviews();
  },

  methods: {
    loadReviews() {
      this.$store.dispatch(REVIEWS_LATEST_LOAD);
    },

    unloadReviews() {
      this.$store.dispatch(REVIEWS_LATEST_UNLOAD);
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