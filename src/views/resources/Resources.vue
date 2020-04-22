<template>
  <div>
    <h1>{{$t('resources')}}</h1>
    <resource-searcher ref="searcher" />
    <resource-search-result @input="change" />
  </div>
</template>

<script>
import ResourceSearcher from "@/components/resource/ResourceSearcher";
import ResourceSearchResult from "@/components/resource/ResourceSearchResult";
import { RESOURCES_SEARCH_UNLOAD } from "@/store/actions.types";

export default {
  name: "Resources",
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
