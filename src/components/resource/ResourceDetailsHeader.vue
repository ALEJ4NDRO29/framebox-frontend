<template>
  <div v-if="resource">
    <b-row>
      <b-col cols="12" sm="3">
        <img
          class="img-fluid img-thumbnail"
          :src="`${getImageUrl()}`"
          :alt="`${resource.resource.title}-image`"
        />

        <b-button block>
          <span v-if="isViewed.viewed">YES</span>
          <span v-else>NO</span>
        </b-button>
      </b-col>

      <b-col cols="12" sm="9">
        <div>
          <h1>
            <resource-icon-type :type="resource.resource.type.name" />
            {{resource.resource.title}}
          </h1>
        </div>

        <div
          class="date"
          v-if="resource.resource.releasedAt"
        >{{formatDate(resource.resource.releasedAt)}}</div>

        <div v-if="resource.resource.description">{{resource.resource.description}}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourceIconType from "@/components/resource/ResourceIconType";
export default {
  name: "ResourceDetailsHeader",
  components: {
    ResourceIconType
  },

  computed: {
    ...mapGetters({
      resource: "getResourceDetails",
      isViewed: "isResourceViewed"
    })
  },

  methods: {
    getImageUrl() {
      if (this.resource.resource.imageUrl) {
        return this.resource.resource.imageUrl;
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
.date {
  margin-bottom: 25px;
}
</style>