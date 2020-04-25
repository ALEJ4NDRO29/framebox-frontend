<template>
  <div>
    <h1>{{$t('resources')}}</h1>
    <div class="create" v-if="currentUser && currentUser.isAdmin">
      <b-button :to="{name: 'ResourcesCreate'}" variant="framebox-primary">{{$t('create')}}</b-button>
    </div>
    <resource-searcher ref="searcher" />
    <resource-search-result @input="change" />
  </div>
</template>

<script>
import ResourceSearcher from "@/components/resource/ResourceSearcher";
import ResourceSearchResult from "@/components/resource/ResourceSearchResult";
import { RESOURCES_SEARCH_UNLOAD } from "@/store/actions.types";
import { mapGetters } from 'vuex';

export default {
  name: "Resources",
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser'
    })
  },
  components: {
    ResourceSearcher,
    ResourceSearchResult
  },

  beforeDestroy() {
    this.$store.dispatch(RESOURCES_SEARCH_UNLOAD);
  },

  methods: {
    change(page) {
      this.$refs.searcher.setPage(page);
    }
  }
};
</script>

<style scoped>
.create {
  margin-bottom: 15px;
}
</style>