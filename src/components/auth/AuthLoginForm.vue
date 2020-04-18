<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group :label="$t('email')" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model="user.email"
          type="email"
          required
          autocomplete="off"
          :placeholder="$t('email')"
        ></b-form-input>
      </b-form-group>

      <b-form-group :label="$t('password')" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model="user.password"
          type="password"
          required
          :placeholder="$t('password')"
        ></b-form-input>
      </b-form-group>

      <span v-if="error" class="text-framebox-secondary">{{$t(error)}}</span>

      <b-button block :disabled="processing" type="submit" variant="framebox-primary">{{$t('login').toUpperCase()}}</b-button>
    </b-form>
  </div>
</template>

<script>
import { LOGIN_USER } from "@/store/actions.types";
export default {
  name: "AuthLoginForm",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      processing: false,
      error: null
    };
  },
  methods: {
    async onSubmit(ev) {
      ev.preventDefault();
      try {
        this.processing = true;
        var user = this.user;
        await this.$store.dispatch(LOGIN_USER, { user });
        this.$router.push({ name: "Home" });
      } catch (e) {
        if (e.response.status === 422) {
          this.error = "invalid_credentials";
        }
      } finally {
        this.processing = false;
      }
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
</style>