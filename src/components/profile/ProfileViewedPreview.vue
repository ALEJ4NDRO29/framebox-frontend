<template>
  <b-card>
    <b-card-text>
      <b-row>
        <b-col lg="2" cols="4">
          <img class="img-fluid img-thumbnail" :src="getImageUrl()" :alt="viewed.resource.title" />
        </b-col>
        <b-col>
          <div class="h2">
            <resource-icon-type class="icon" :type="viewed.resource.type.name" />
            <router-link
              :to="{name: 'ResourcesDetails', params: {slug: viewed.resource.slug}}"
            >{{viewed.resource.title}}</router-link>
          </div>
          <div>{{formatDate(viewed.createdAt)}}</div>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";
export default {
  name: "ProfileViewedPreview",
  props: {
    viewed: Object
  },
  components: {
    ResourceIconType
  },
  methods: {
    getImageUrl() {
      if (this.viewed.resource.imageUrl) {
        return this.viewed.resource.imageUrl;
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
</style>