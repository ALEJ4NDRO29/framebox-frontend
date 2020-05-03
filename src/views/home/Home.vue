<template>
  <div>
    <resource-latest/>

    <review-latest/>
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
 
};
</script>
