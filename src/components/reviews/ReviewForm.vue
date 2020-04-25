<template>
  <div>
    <b-form-group :label="$t('rate')" label-for="review-rate">
      <b-form-rating id="review-rate" v-model="reviewTmp.rate" stars="10"></b-form-rating>
      <!-- <b-form-select
        id="review-rate"
        v-model="reviewTmp.rate"
        :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        required
      />-->
    </b-form-group>

    <b-form-group :label="$t('review')">
      <b-form-textarea type="text" v-model="reviewTmp.review" />
    </b-form-group>

    <div>
      <b-button v-if="review" variant="framebox-primary" @click="update">{{$t('update')}}</b-button>
      <b-button v-else variant="framebox-primary" @click="create">{{$t('create')}}</b-button>
      <b-button variant="framebox-primary" @click="cancel">{{$t('cancel')}}</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ReviewForm",
  props: {
    review: Object
  },
  computed: {
    ...mapGetters({
      resource: "getResourceDetails"
    })
  },
  data() {
    return {
      reviewTmp: {}
    };
  },
  mounted() {
    this.reviewTmp = Object.assign({}, this.review);
  },

  methods: {
    create() {
      this.reviewTmp.resource = this.resource.resource.slug;
      this.$emit("create", this.reviewTmp);
    },
    update() {
      this.$emit("update", this.reviewTmp);
    },
    cancel() {
      this.$emit("cancel", this.reviewTmp);
    }
  }
};
</script>

<style >
button {
  margin-right: 5px;
}
</style>