<template>
  <div>
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1 class="text-center">{{$t('create_account')}}</h1>
        <auth-register-form />
        <span>
          {{$t('already_have_account')}}
          <router-link :to="{name: 'Login'}">{{$t('login')}}</router-link>
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AuthRegisterForm from "@/components/auth/AuthRegisterForm";

export default {
  name: "Register",
  components: {
    AuthRegisterForm
  },
  mounted() {
    window.document.title = `${this.$t("create_account")} - Framebox`;
  }
};
</script>