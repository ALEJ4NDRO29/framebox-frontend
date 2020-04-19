<template>
  <div v-if="profile">
    <div>
      <span>{{$t('karma')}} {{profile.karma}}</span>
    </div>

    <div v-if="profile.name">
      <span>{{$t('name')}} {{profile.name}}</span>
    </div>

    <div v-if="profile.website">
      <span>{{$t('website')}} {{profile.website}}</span>
    </div>

    <div v-if="profile.bio">
      <span>{{$t('bio')}} {{profile.bio}}</span>
    </div>

    <!-- TOOD: viewed_content -->
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
