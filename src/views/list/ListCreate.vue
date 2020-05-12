<template>
  <div>
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1>{{$t('create_list')}}</h1>
        <list-form @submit="submit" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListForm from "@/components/list/ListForm";
import { List } from "../../common/api.service";

export default {
  name: "ListCreate",
  components: {
    ListForm
  },
  mounted() {
    window.document.title = this.$t("create_list");
  },
  methods: {
    async submit(createList) {
      var res = await List.create(createList);
      var created = res.data;

      this.$router.push({
        name: "ListDetails",
        params: { slug: created.list.slug }
      });
    }
  }
};
</script>