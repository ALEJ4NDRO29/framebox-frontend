<template>
  <div v-if="profile">
    <div>
      <b>{{$t('karma')}}: </b>
      <span>{{profile.karma}}</span>
    </div>

    <div v-if="profile.name">
      <b>{{$t('name')}}: </b>
      <span>{{profile.name}}</span>
    </div>

    <div v-if="profile.website">
      <b>{{$t('website')}}: </b>
      <a target="_blank" :href="profile.website">{{profile.website}}</a>
    </div>

    <div v-if="profile.status">
      <b>{{$t('status')}}: </b>
      <span>{{profile.status}}</span>
    </div>

    <div v-if="profile.bio">
      <b>{{$t('bio')}}: </b>
      <span>{{profile.bio}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileDetails",
  computed: {
    ...mapGetters({
      profile: "getProfile"
    })
  }
};
</script>
