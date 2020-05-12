<template>
  <div v-if="error">{{$t('resource_not_found')}}</div>
  <div v-else-if="resource">
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1>{{$t('update_resource')}}</h1>
        <resource-form :resourceUpdate="resource.resource" @submit="submit" />
        <b-button class="remove" @click="remove" variant="outline-danger">{{$t(removeText)}}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Resource } from "../../common/api.service";
import ResourceForm from "@/components/resource/ResourceForm.vue";
import {
  RESOURCE_UPDATE_LOAD,
  RESOURCE_UPDATE_UNLOAD
} from "@/store/actions.types";

export default {
  name: "ResourcesConfigure",
  components: {
    ResourceForm
  },

  data() {
    return {
      error: false,
      removeText: "remove",
      clickAgainToConfirmRemove: false
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      resource: "getUpdatingResource"
    })
  },

  mounted() {
    if (!this.currentUser.isAdmin) {
      this.$router.push({ name: "Home" });
      return;
    }
    window.document.title = `${this.$t('update_resource')} - Framebox`;

    this.$store
      .dispatch(RESOURCE_UPDATE_LOAD, this.$route.params.slug)
      .catch(() => {
        this.error = true;
      });
  },

  beforeDestroy() {
    this.$store.dispatch(RESOURCE_UPDATE_UNLOAD);
  },

  methods: {
    async submit(resourceUpdate) {
      var res = await Resource.update(resourceUpdate.slug, resourceUpdate);

      var updated = res.data;

      this.$router.push({
        name: "ResourcesDetails",
        params: { slug: updated.resource.slug }
      });
    },
    async remove() {
      if (!this.clickAgainToConfirmRemove) {
        this.clickAgainToConfirmRemove = true;
        this.removeText = "click_again_to_remove";
        setTimeout(() => {
          this.clickAgainToConfirmRemove = false;
          this.removeText = "remove";
        }, 2000);
        return;
      }

      await Resource.remove(this.resource.resource.slug);
      this.$router.push({
        name: "Resources"
      });
    }
  }
};
</script>
<style scoped>
.remove {
  margin-top: 25px;
}
</style>