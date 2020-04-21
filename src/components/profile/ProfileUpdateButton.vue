<template>
  <div v-if="nickname">
    <b-button :to="{name:'Home'}" size="sm" variant="framebox-primary">{{$t('edit_profile')}}</b-button>
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
