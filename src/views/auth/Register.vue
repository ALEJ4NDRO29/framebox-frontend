<template>
  <div class="text-center">
    <h1>{{$t('create_account')}}</h1>

    <span>
      {{$t('already_have_account')}}
      <router-link :to="{name: 'Login'}">{{$t('login')}}</router-link>
    </span>

    <auth-register-form />
  </div>
</template>

<script>
import AuthRegisterForm from "@/components/auth/AuthRegisterForm";

export default {
  name: "Register",
  components: {
    AuthRegisterForm
  }
};
</script>