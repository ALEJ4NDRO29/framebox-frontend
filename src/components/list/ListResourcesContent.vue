<template>
  <div>
    <h2>{{$t('content')}}</h2>
    <div v-if="content">
      <div v-if="content.docs.length > 0">
        <list-resource-preview
          v-for="(listResource, key) in content.docs"
          :list-resource="listResource"
          :key="key"
          @update="change"
        />

        <v-pagination
          v-model="currentPage"
          @input="change"
          :page-count="content.totalPages"
          :classes="BOOTSTRAP_PAGINATION_CLASSES"
        ></v-pagination>
      </div>
      <div v-else>
        <span>{{$t('empty_list')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BOOTSTRAP_PAGINATION_CLASSES } from "@/common/constants";
import ListResourcePreview from "@/components/list/ListResourcePreview";
import { LIST_CONTENT_UPDATE } from "../../store/actions.types";

export default {
  name: "ListContent",
  components: {
    ListResourcePreview
  },
  data() {
    return {
      currentPage: 1,
      BOOTSTRAP_PAGINATION_CLASSES
    };
  },

  computed: {
    ...mapGetters({
      list: "getCurrentList",
      content: "getListContent"
    })
  },

  methods: {
    change() {
      var params = {
        slug: this.list.list.slug,
        pagination: {
          page: this.currentPage,
          limit: 5
        }
      };
      this.$store.dispatch(LIST_CONTENT_UPDATE, params);
    }
  }
};
</script>