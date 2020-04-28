<template>
  <b-row>
    <b-dropdown
      class="dropdown"
      :text="$t('add_to_list')"
      block
      variant="framebox-primary"
      v-if="lists"
    >
      <b-dropdown-item
        v-for="(list, key) in lists.lists"
        :key="key"
        @click="addToList(list.slug)"
      >{{list.name}}</b-dropdown-item>
      <b-dropdown-divider v-if="lists.lists.length > 0" />

      <b-dropdown-item :to="{name: 'ListsCreate'}">✏ {{$t('create')}}</b-dropdown-item>
    </b-dropdown>

    <span class="text-success" v-if="msg">{{$t(msg)}}</span>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { List } from "../../common/api.service";
export default {
  name: "ResourceAddToList",
  data() {
    return {
      msg: null
    };
  },
  computed: {
    ...mapGetters({
      lists: "getResourceLists",
      resource: "getResourceDetails"
    })
  },

  methods: {
    async addToList(slug) {
      var params = {
        resource: {
          slug: this.resource.resource.slug
        }
      };

      await List.addContent(slug, params);
      
      this.msg = "added";
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    }
  }
};
</script>
<style scoped>
.dropdown {
  margin-bottom: 15px;
  width: 100%;
}
</style>