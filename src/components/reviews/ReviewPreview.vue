<template>
  <b-card>
    <b-card-text>
      <b-row>
        <b-col lg="2" cols="4" v-if="showImage">
          <img class="img-fluid img-thumbnail" :src="getImageUrl()" :alt="review.resource.title" />
        </b-col>
        <b-col>
          <h2>
            <resource-icon-type class="icon" :type="review.resource.type.name" />
            <router-link
              :to="{name: 'ResourcesDetails', params: {slug: review.resource.slug}}"
            >{{review.resource.title}}</router-link>
          </h2>

          <div>
            {{formatDate(review.createdAt)}}
            <font-awesome-icon icon="star" />
            {{review.rate}}
          </div>

          <small>
            <router-link
              :to="{name: 'Profile', params: {nickname: review.profile.nickname}}"
            >{{review.profile.nickname}}</router-link>
          </small>

          <div>{{review.review}}</div>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";

export default {
  name: "ReviewPreview",
  props: {
    showImage: Boolean,
    review: Object
  },

  components: {
    ResourceIconType
  },

  methods: {
    getImageUrl() {
      if (this.review.resource.imageUrl) {
        return this.review.resource.imageUrl;
      } else {
        return require("../../assets/default-movie.jpg");
      }
    },
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}

.review-row {
  margin-left: 10px;
}
</style>