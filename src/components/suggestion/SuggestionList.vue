<template>
  <div v-if="suggestions">
    <div v-if="suggestions.docs.length > 0">
      <suggestion-preview
        v-for="(suggestion, key) in suggestions.docs"
        @update="change"
        :suggestion="suggestion"
        :key="key"
      />

      <v-pagination
        v-model="currentPage"
        @input="change"
        :page-count="suggestions.totalPages"
        :classes="BOOTSTRAP_PAGINATION_CLASSES"
      ></v-pagination>
    </div>
    <div v-else>{{$t('no_suggestions')}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SuggestionPreview from "@/components/suggestion/SuggestionPreview";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";

export default {
  name: "SuggestionList",
  components: {
    SuggestionPreview
  },
  
  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  computed: {
    ...mapGetters({
      suggestions: "getSuggestions"
    })
  },

  methods: {
    change() {
      this.$emit('pageUpdate', this.currentPage);
    }
  }
};
</script>