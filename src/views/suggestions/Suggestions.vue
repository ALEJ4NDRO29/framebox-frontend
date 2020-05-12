<template>
  <div>
    <h1>{{$t('suggestions')}}</h1>
          <b-button :to="{name: 'SuggestionsCreate'}" variant="framebox-primary">{{$t('create')}}</b-button>
    <suggestion-list @pageUpdate="setPage"/>
  </div>
</template>

<script>
import {
  SUGGESTION_LIST_UNLOAD,
  SUGGESTION_LIST_LOAD
} from "../../store/actions.types";
import SuggestionList from "@/components/suggestion/SuggestionList";

export default {
  name: "Suggestions",
  components: {
    SuggestionList
  },

  mounted() {
    window.document.title = `${this.$t('suggestions')} - Framebox`;
    this.$store.dispatch(SUGGESTION_LIST_LOAD, { limit: 5 });
  },

  beforeDestroy() {
    this.$store.dispatch(SUGGESTION_LIST_UNLOAD);
  },

  methods: {
    setPage(page) {
      this.$store.dispatch(SUGGESTION_LIST_LOAD, { limit: 5, page });
    }
  }
};
</script>
