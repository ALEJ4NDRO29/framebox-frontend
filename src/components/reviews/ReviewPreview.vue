<template>
  <b-card>
    <b-card-text>
      <h2>
        {{review.resource.title}}
        <resource-icon-type :type="review.resource.type.name" />
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
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";

export default {
  name: "ReviewPreview",
  props: {
    review: Object
  },

  components: {
    ResourceIconType
  },

  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }
  }
};
</script>
