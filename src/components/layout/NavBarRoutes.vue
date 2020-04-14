 <template>
  <b-navbar-nav>
    <b-nav-item to="/resources"> {{$t('resources')}} </b-nav-item>
    <b-nav-item to="/about"> {{$t('about')}} </b-nav-item>
  </b-navbar-nav>
</template>
 
<script>
export default {
  name: "NavBarRoutes"
};
</script>