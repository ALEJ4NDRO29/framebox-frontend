<template>
  <div>
    <span v-if="error">{{$t('cannot_load_list')}}</span>
    <div v-if="list">
      <list-details-header />
      <list-resources-content />
    </div>
  </div>
</template>

<script>
import { LIST_DETAILS_LOAD, LIST_DETAILS_UNLOAD } from "@/store/actions.types";
import { mapGetters } from "vuex";
import ListDetailsHeader from "@/components/list/ListDetailsHeader";
import ListResourcesContent from "@/components/list/ListResourcesContent";

export default {
  name: "ListDetails",
  components: {
    ListDetailsHeader,
    ListResourcesContent
  },

  data() {
    return {
      error: false
    };
  },

  computed: {
    ...mapGetters({
      list: "getCurrentList"
    })
  },

  mounted() {
    window.document.title = this.$t("list");

    var params = {
      slug: this.$route.params.slug,
      paginate: {
        limit: 5,
        page: 1
      }
    };

    this.$store
      .dispatch(LIST_DETAILS_LOAD, params)
      .then(() => {
        setTimeout(() => { // FIXME
          window.document.title = `${this.list.list.name} - ${this.$t("list")}`;
        }, 200);
      })
      .catch(() => {
        this.error = true;
      });
  },

  beforeDestroy() {
    this.$store.dispatch(LIST_DETAILS_UNLOAD);
  }
};
</script>