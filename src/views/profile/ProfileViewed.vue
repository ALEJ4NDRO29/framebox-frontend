<template>
  <div>
    <h1>{{$t('viewed')}}</h1>
    <profile-viewed-list/>
  </div>
</template>

<script>
import ProfileViewedList from "@/components/profile/ProfileViewedList";
export default {
  name: "ProfileViewed",
  components: {
      ProfileViewedList
  }
};
</script>
