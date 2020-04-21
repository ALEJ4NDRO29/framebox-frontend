<template>
  <div v-if="viewed">
    <div v-if="viewed.docs.length === 0">0 viewed</div>

    <div v-else>
      <profile-viewed-preview v-for="(content, key) in viewed.docs" :viewed="content" :key="key" />
      <v-pagination
        v-model="currentPage"
        @input="change"
        :page-count="viewed.totalPages"
        :classes="BOOTSTRAP_PAGINATION_CLASSES"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VIEWED_LOAD, VIEWED_UNLOAD } from "@/store/actions.types";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";
import ProfileViewedPreview from "@/components/profile/ProfileViewedPreview";

export default {
  name: "ProfileViewed",
  components: {
    ProfileViewedPreview
  },
  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  computed: {
    ...mapGetters({
      viewed: "getViewed"
    })
  },

  mounted() {
    this.loadViews();
  },

  beforeDestroy() {
    this.$store.dispatch(VIEWED_UNLOAD);
  },

  methods: {
    loadViews() {
      var params = {
        page: this.currentPage,
        limit: 5
      }
      this.$store.dispatch(VIEWED_LOAD, params);
    },
    change() {
      this.loadViews();
    }
  }
};
</script>
