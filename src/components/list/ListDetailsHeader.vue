<template>
  <div>
    <div>
      <h1>{{list.list.name}}</h1>
      <small v-if="list.list.private">— {{$t('private')}}</small>
    </div>

    <b-row>
      <b-col cols="3" lg="1">{{$t('created')}}</b-col>
      <b-col>— {{formatDate(list.list.createdAt)}}</b-col>
    </b-row>
    <b-row>
      <b-col cols="3" lg="1">{{$t('updated')}}</b-col>
      <b-col>— {{formatDate(list.list.updatedAt)}}</b-col>
    </b-row>

    <hr />

    <pre class="default" v-if="list.list.description">{{list.list.description}}</pre>

    <b-button
      class="update"
      v-if="canUpdate()"
      :to="{name: 'ListConfigure', params:{slug: list.list.slug}}"
      variant="framebox-primary"
    >{{$t('update')}}</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ListDetailsHeader",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      list: "getCurrentList"
    })
  },
  methods: {
    canUpdate() {
      if (!this.currentUser) {
        return false;
      }

      if (this.list.list.owner.nickname === this.currentUser.nickname) {
        return true;
      }

      if (this.currentUser.isAdmin) {
        return true;
      }

      return false;
    },

    formatDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>

<style scoped>

.update {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>