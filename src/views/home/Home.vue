<template>
  <div>
    <resource-latest />

    <review-latest :showImage="true" />
  </div>
</template>

<script>
import ResourceLatest from "@/components/resource/ResourceLatest";
import ReviewLatest from "@/components/reviews/ReviewLatest";

export default {
  name: "Home",
  components: {
    ResourceLatest,
    ReviewLatest
  },
  mounted() {
    window.document.title = `${this.$t("home")} - Framebox`;
  }
};
</script>
