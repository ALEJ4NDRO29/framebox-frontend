<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="gb-foreground">
      <b-container>
        <b-navbar-brand to="/">Framebox</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <nav-bar-routes />

          <b-navbar-nav class="ml-auto">
            <!-- LANG SELECTOR -->
            <lang-selector />

            <!-- User / login -->
            <nav-bar-auth />
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import LangSelector from "@/components/layout/LangSelector";
import NavBarAuth from "@/components/layout/NavBarAuth";
import NavBarRoutes from "@/components/layout/NavBarRoutes";

export default {
  name: "NavBar",
  components: {
    LangSelector,
    NavBarAuth,
    NavBarRoutes
  }
};
</script>