<template>
  <div>
    <h1>Reviews</h1>
    
    <p>{{$t('my_review')}} </p>
    <div v-if="myReview && myReview.review">
      <pre>
        {{myReview}}
      </pre>
    </div>
    <div v-else>
      create review
    </div>



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
import ReviewPreview from "@/components/reviews/ReviewPreview";

export default {
  name: "ResourceReviewsList",
  components: {
    ReviewPreview
  },
  computed: {
    ...mapGetters({
      reviews: "getResourceReviews",
      myReview: "getResourceMyReview"
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
      console.log("change page");
    }
  }
};
</script>
