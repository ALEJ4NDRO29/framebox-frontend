<template>
  <div v-if="lists">
    <div v-if="lists.lists.docs.length > 0">
      <list-preview v-for="(list, key) in lists.lists.docs" :list="list" :key="key" />

      <v-pagination
        v-model="currentPage"
        @input="change"
        :page-count="lists.lists.totalPages"
        :classes="BOOTSTRAP_PAGINATION_CLASSES"
      ></v-pagination>
    </div>
    <div v-else>{{$t('no_lists')}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListPreview from "@/components/list/ListPreview";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";

export default {
  name: "ListsUserList",
  components: {
    ListPreview
  },

  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  computed: {
    ...mapGetters({
      lists: "getUserLists"
    })
  },

  methods: {
    change() {
      this.$emit('set-page', this.currentPage);
    }
  }
};
</script>