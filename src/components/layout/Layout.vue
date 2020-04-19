<template>
  <div>
    <NavBar />
    <b-container class="content">
      <router-view />
    </b-container>
    <!-- FOOTER -->
    <DialogAlert />
  </div>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import DialogAlert from "@/components/layout/DialogAlert";

export default {
  name: "Layout",
  components: {
    NavBar,
    DialogAlert
  }
};
</script>