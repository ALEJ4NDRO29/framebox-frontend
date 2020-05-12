<template>
  <div>
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1 class="text-center">{{$t('login')}}</h1>
        <auth-login-form />
        <span>
          {{$t('not_have_account')}}
          <router-link :to="{name: 'Register'}">{{$t('create_account')}}</router-link>
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AuthLoginForm from "@/components/auth/AuthLoginForm";

export default {
  name: "Login",
  components: {
    AuthLoginForm
  },
  mounted() {
    window.document.title = `${this.$t("login")} - Framebox`;
  }
};
</script>