<template>
  <b-card>
    <b-card-text>
      <b-row>
        <b-col lg="2" cols="4">
          <img class="img-fluid img-thumbnail" :src="getImageUrl()" :alt="resource.title" />
        </b-col>

        <b-col>
          <p class="h2">
            <resource-icon-type class="icon" :type="resource.type.name" />
            <router-link
              :to="{name: 'ResourcesDetails', params: {slug: resource.slug}}"
            >{{resource.title}}</router-link>
          </p>
          <p v-if="resource.releasedAt">{{formatDate(resource.releasedAt)}}</p>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";

export default {
  name: "ResourcePreview",
  props: {
    resource: Object
  },
  components: {
    ResourceIconType
  },
  methods: {
    getImageUrl() {
      if (this.resource.imageUrl) {
        return this.resource.imageUrl;
      } else {
        return require("../../assets/default-movie.jpg");
      }
    },
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}
</style>