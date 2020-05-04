<template>
  <b-row>
    <b-col cols="12" lg="6" offset-lg="3">
      <suggestion-form />
    </b-col>
  </b-row>
</template>

<script>
import SuggestionForm from "@/components/suggestion/SuggestionForm";
import { mapGetters } from "vuex";

export default {
  name: "SuggestionsCreate",
  components: {
    SuggestionForm
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  }
};
</script>
