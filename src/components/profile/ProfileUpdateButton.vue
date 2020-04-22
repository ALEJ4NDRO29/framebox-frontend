<template>
  <div v-if="nickname">
    <b-button
      :to="{name:'ProfileUpdate', params : {nickname}}"
      size="sm"
      variant="framebox-primary"
    >{{$t('edit_profile')}}</b-button>
  </div>
</template>

<script>
export default {
  name: "ProfileUpdateButton",
  props: {
    nickname: String
  }
};
</script>
