<template>
  <div>
    <NavBar />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/layout/NavBar";

export default {
  name: "Layout",
  components: {
    NavBar
  }
};
</script>