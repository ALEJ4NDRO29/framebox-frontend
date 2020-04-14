<template>
  <div>

        <b-form>
          <b-form-group :label="$t('email')" label-for="login-email">
            <b-form-input
              id="login-email"
              v-model="login.email"
              type="email"
              required
              :placeholder="$t('email')"
            ></b-form-input>
          </b-form-group>

          <b-form-group :label="$t('password')" label-for="login-password">
            <b-form-input
              id="login-password"
              v-model="login.password"
              type="password"
              required
              :placeholder="$t('password')"
            ></b-form-input>
          </b-form-group>
        </b-form>
  </div>
</template>

<script>
export default {
  name: "AuthLoginForm",
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  }
};
</script>
