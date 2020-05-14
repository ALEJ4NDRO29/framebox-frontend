<template>
  <div class="text-center">
    <img alt="Framebox logo" src="../../assets/logo-h.png" class="img-fluid center" />
    <p class="h3">Sources</p>
    <p>
      <a href="https://github.com/ALEJ4NDRO29/framebox-backend" target="_blank">Backend</a>
    </p>
    <p>
      <a href="https://github.com/ALEJ4NDRO29/framebox-frontend" target="_blank">Frontend</a>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  mounted() {
    window.document.title = `${this.$t("about")} - Framebox`;
  }
};
</script>
