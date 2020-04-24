<template>
  <div>
    <h1>Reviews</h1>

    <resource-user-review @refresh="updateReviews" />

    <div v-if="reviews && reviews.reviews.docs.length > 0">
      <review-preview v-for="(review, key) in reviews.reviews.docs" :review="review" :key="key" />

      <v-pagination
        v-model="currentPage"
        @input="change"
        :page-count="reviews.reviews.totalPages"
        :classes="BOOTSTRAP_PAGINATION_CLASSES"
      ></v-pagination>
    </div>
    <div v-else>
      <!-- No hay reviews -->
      {{$t('no_reviews')}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";
import { RESOURCES_REVIEW_PAGINATE, RESOURCES_AVERAGE_LOAD } from "@/store/actions.types";
import ReviewPreview from "@/components/reviews/ReviewPreview";
import ResourceUserReview from "@/components/resource/ResourceUserReview";

export default {
  name: "ResourceReviewsList",
  components: {
    ReviewPreview,
    ResourceUserReview
  },
  computed: {
    ...mapGetters({
      resource: "getResourceDetails",
      reviews: "getResourceReviews"
    })
  },

  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  methods: {
    change() {
      var data = {
        slug: this.resource.resource.slug,
        params: {
          page: this.currentPage
        }
      };
      this.$store.dispatch(RESOURCES_REVIEW_PAGINATE, data);
    },
    updateReviews() {
      this.change();
      this.$store.dispatch(RESOURCES_AVERAGE_LOAD, this.resource.resource.slug);
    }
  }
};
</script>
