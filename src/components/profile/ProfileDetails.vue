<template>
  <div v-if="profile">
    <div>
      <b-row>
        <b-col cols="12" sm="2">
          <b>{{$t('karma')}}:</b>
        </b-col>
        <b-col>
          <span>{{profile.karma}}</span>
        </b-col>
      </b-row>
    </div>

    <div v-if="profile.name">
      <b-row>
        <b-col cols="12" sm="2">
          <b>{{$t('name')}}:</b>
        </b-col>
        <b-col>
          <span>{{profile.name}}</span>
        </b-col>
      </b-row>
    </div>

    <div v-if="profile.website">
      <b-row>
        <b-col cols="12" sm="2">
          <b>{{$t('website')}}:</b>
        </b-col>
        <b-col>
          <a target="_blank" :href="profile.website">{{profile.website}}</a>
        </b-col>
      </b-row>
    </div>

    <div v-if="profile.status">
      <b-row>
        <b-col cols="12" sm="2">
          <b>{{$t('status')}}:</b>
        </b-col>
        <b-col>
          <span>{{profile.status}}</span>
        </b-col>
      </b-row>
    </div>

    <div v-if="profile.bio">
      <b-row>
        <b-col cols="12" sm="2">
          <b>{{$t('bio')}}:</b>
        </b-col>
        <b-col>
          <pre class="default">{{profile.bio}}</pre>
        </b-col>
      </b-row>
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
