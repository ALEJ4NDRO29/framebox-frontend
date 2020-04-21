<template>
  <div>
    <resource-list/>

    <review-latest/>
  </div>
</template>

<script>
import ResourceList from "@/components/resource/ResourceLatest";
import ReviewLatest from "@/components/reviews/ReviewLatest";

export default {
  name: "Home",
  components: {
    ResourceList,
    ReviewLatest
  },
 
};
</script>
