<template>
  <div>
    <Layout />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>-->
  </div>
</template>

<script>
import Layout from "@/components/layout/Layout";

export default {
  name: "App",
  components: {
    Layout
  }
};
</script>