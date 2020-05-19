<template>
  <div v-if="resources">
    <h2>{{$t('recently_added')}}</h2>
    <b-row>
      <resource-preview
        class="col-lg-4 col-md-6 col-12"
        :imgCols="4"
        v-for="(resource, key) in resources.docs"
        :resource="resource"
        :key="key"
      />
    </b-row>
  </div>
  <div v-else>
    <!-- <b-spinner variant="light" label="Loading..."></b-spinner> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  RESOURCES_LATEST_LOAD,
  RESOURCES_LATEST_UNLOAD
} from "@/store/actions.types";
import ResourcePreview from "@/components/resource/ResourcePreview";

export default {
  name: "ResourceLatest",
  components: {
    ResourcePreview
  },

  computed: {
    ...mapGetters({
      resources: "getLatestResources"
    })
  },

  mounted() {
    this.loadResources();
  },

  beforeDestroy() {
    this.unloadResources();
  },

  methods: {
    loadResources() {
      this.$store.dispatch(RESOURCES_LATEST_LOAD);
    },
    unloadResources() {
      this.$store.dispatch(RESOURCES_LATEST_UNLOAD);
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