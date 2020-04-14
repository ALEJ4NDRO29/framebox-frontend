<template>
  <div>
    <NavBar />
    <b-container class="content">
      <router-view />
    </b-container>
    <!-- FOOTER -->
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