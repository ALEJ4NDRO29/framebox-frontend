<template>
  <div v-if="list">
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1>{{$t('list_update')}}</h1>
        <list-form :listUpdating="list" @submit="submit" />
        <b-button class="remove" @click="remove" variant="outline-danger">{{$t(removeText)}}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListForm from "@/components/list/ListForm";
import { mapGetters } from "vuex";
import {
  LIST_UPDATING_LOAD,
  LIST_UPDATING_UNLOAD
} from "../../store/actions.types";
import { List } from "../../common/api.service";

export default {
  name: "ListConfigure",
  data() {
    return {
      removeText: "remove",
      clickAgainToConfirmRemove: false
    };
  },

  computed: {
    ...mapGetters({
      list: "getUpdatingList"
    })
  },

  components: {
    ListForm
  },

  mounted() {
    window.document.title = this.$t("list_update");
    var slug = this.$route.params.slug;
    this.$store.dispatch(LIST_UPDATING_LOAD, slug);
    // TODO COMPROBAR PERMISOS
  },

  beforeDestroy() {
    this.$store.dispatch(LIST_UPDATING_UNLOAD);
  },

  methods: {
    async submit(updatingList) {
      var res = await List.update(updatingList.slug, updatingList);
      var list = res.data;
      this.$router.push({
        name: "ListDetails",
        params: { slug: list.list.slug }
      });
    },

    async remove() {
      if (!this.clickAgainToConfirmRemove) {
        this.clickAgainToConfirmRemove = true;
        this.removeText = "click_again_to_remove";
        setTimeout(() => {
          this.clickAgainToConfirmRemove = false;
          this.removeText = "remove";
        }, 2000);
        return;
      }

      await List.remove(this.list.list.slug);
      this.$router.push({
        name: "List"
      });
    }
  }
};
</script>