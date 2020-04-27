<template>
  <div>
    <div>
      <h1>{{list.list.name}}</h1>
      <small v-if="list.list.private">— {{$t('private')}}</small>
    </div>

    <b-button
      v-if="canUpdate()"
      :to="{name: 'ListConfigure', params:{slug: list.list.slug}}"
      variant="framebox-primary"
    >{{$t('update')}}</b-button>

    <!-- <pre style="color:white">{{list}}</pre> -->
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
    }
  }
};
</script>
