<template>
  <div>
    <div v-if="searchResult">
      <div v-if="searchResult && searchResult.docs.length === 0">No results</div>
      <div v-else>
        <resource-preview
          v-for="(resource, key) in searchResult.docs"
          :resource="resource"
          :key="key"
        />

        <v-pagination
          v-model="currentPage"
          @input="change"
          :page-count="searchResult.totalPages"
          :classes="BOOTSTRAP_PAGINATION_CLASSES"
        ></v-pagination>
      </div>
    </div>
    <div v-else>
      <span>Comienze a buscar algo :)</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourcePreview from "@/components/resource/ResourcePreview";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";

export default {
  name: "ResourceSearchResult",
  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  computed: {
    ...mapGetters({
      searchResult: "getSearchResult"
    })
  },
  
  components: {
    ResourcePreview
  },

  methods: {
      change() {
          this.$emit('input', this.currentPage);
      }
  }
};
</script>
