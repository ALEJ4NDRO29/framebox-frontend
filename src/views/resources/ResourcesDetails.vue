<template>
  <div>
    <div v-if="resource">
      <resource-details-header />
    </div>
    <span v-if="error">{{$t(error)}}</span>
  </div>
</template>

<script>
import {
  RESOURCES_DETAILS_LOAD,
  RESOURCES_DETAILS_UNLOAD
} from "@/store/actions.types.js";
import { mapGetters } from "vuex";
import ResourceDetailsHeader from "@/components/resource/ResourceDetailsHeader";

export default {
  name: "ResourcesDetails",
  components: {
    ResourceDetailsHeader
  },
  data() {
    return {
      error: null
    };
  },
  computed: {
    ...mapGetters({
      resource: "getResourceDetails",
      currentUser: "getCurrentUser"
    })
  },
  async mounted() {
    window.document.title = "Framebox";

    try {
      var params = {
        slug: this.$route.params.slug,
        userLogged: this.currentUser !== null
      };
      await this.$store.dispatch(RESOURCES_DETAILS_LOAD, params);
      setTimeout(() => { // FIXME
        window.document.title = `${this.resource.resource.title} - Framebox`;
      }, 200);
    } catch (e) {
      this.error = "resource_not_found";
    }
  },
  beforeDestroy() {
    this.$store.dispatch(RESOURCES_DETAILS_UNLOAD);
  }
};
</script>