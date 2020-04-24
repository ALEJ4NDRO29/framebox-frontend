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
  /**
   * TODO:
   * CARGAR DETALLES
   * COMPROBAR SI VISTO (USUARIO LOGUEADO)
   * CARGAR REVIEW DEL USUARIO (USUARIO LOGUEADO)
   * CARGAR REVIEWS
   * ADMIN OPTIONS
   */ 
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
    try {
      var params = {
        slug: this.$route.params.slug,
        userLogged: this.currentUser !== null
      };
      await this.$store.dispatch(RESOURCES_DETAILS_LOAD, params);
    } catch (e) {
      this.error = "resource_not_found";
    }
  },
  beforeDestroy() {
    this.$store.dispatch(RESOURCES_DETAILS_UNLOAD);
  }
};
</script>