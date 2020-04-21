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
export default {
  name: "Resources",
  components: {
    ResourceSearcher,
    ResourceSearchResult
  },
  methods: {
    change(page) {
      this.$refs.searcher.setPage(page);
    }
  }
};
</script>
