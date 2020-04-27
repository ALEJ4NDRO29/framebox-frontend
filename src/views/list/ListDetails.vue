<template>
  <div>
    <span v-if="error">{{$t('cannot_load_list')}}</span>
    <div v-if="list">
      <list-details-header />
    </div>
  </div>
</template>

<script>
import { LIST_DETAILS_LOAD, LIST_DETAILS_UNLOAD } from "@/store/actions.types";
import { mapGetters } from "vuex";
import ListDetailsHeader from "@/components/list/ListDetailsHeader";

export default {
  name: "ListDetails",
  data() {
    return {
      error: false
    };
  },

  components: {
    ListDetailsHeader
  },

  computed: {
    ...mapGetters({
      list: "getCurrentList"
    })
  },

  mounted() {
    var params = {
      slug: this.$route.params.slug
    };

    this.$store.dispatch(LIST_DETAILS_LOAD, params).catch(() => {
      this.error = true;
    });
  },

  beforeDestroy() {
    this.$store.dispatch(LIST_DETAILS_UNLOAD);
  }
};
</script>