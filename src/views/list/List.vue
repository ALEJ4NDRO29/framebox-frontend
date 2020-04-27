<template>
  <div>
    <h1>{{$t('my_lists')}}</h1>
    <b-button :to="{name: 'ListsCreate'}" variant="framebox-primary">{{$t('create')}}</b-button>
    <lists-user-list @set-page="setPage" />
  </div>
</template>

<script>
import ListsUserList from "@/components/list/ListsUserList";
import { LIST_LOAD, LIST_UNLOAD } from "@/store/actions.types";

export default {
  name: "List",
  components: {
    ListsUserList
  },

  mounted() {
    this.setPage(1);
  },

  beforeDestroy() {
    this.$store.dispatch(LIST_UNLOAD);
  },

  methods: {
    setPage(page) {
      var params = {
        limit: 5,
        page
      };
      this.$store.dispatch(LIST_LOAD, params);
    }
  }
};
</script>