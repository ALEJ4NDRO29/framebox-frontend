<template>
  <div class="text-center">
    <b-row>
      <b-col cols="12" lg="6" offset-md="3">
        <h1>{{$t('login')}}</h1>
        <span>
          {{$t('not_have_account')}}
          <router-link :to="{name: 'Register'}">{{$t('create_account')}}</router-link>
        </span>
        <auth-login-form />
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
  }
};
</script>