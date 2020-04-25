<template>
  <div>
    <h1>ResAdmin</h1>
    {{currentUser}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ResourcesConfigure",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  mounted() {
    if (!this.currentUser.isAdmin) {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>