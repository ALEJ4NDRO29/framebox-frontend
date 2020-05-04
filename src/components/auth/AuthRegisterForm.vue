<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group :label="$t('nickname')" label-for="register-nickname">
        <b-form-input
          id="register-nickname"
          v-model="user.nickname"
          type="text"
          required
          :placeholder="$t('nickname')"
          autocomplete="off"
        ></b-form-input>
      </b-form-group>

      <b-form-group :label="$t('email')" label-for="register-email">
        <b-form-input
          id="register-email"
          v-model="user.email"
          type="email"
          required
          autocomplete="off"
          :placeholder="$t('email')"
        ></b-form-input>
      </b-form-group>

      <b-form-group :label="$t('password')" label-for="register-password">
        <b-form-input
          id="register-password"
          v-model="user.password"
          type="password"
          required
          :placeholder="$t('password')"
        ></b-form-input>
      </b-form-group>

      <span v-if="error" class="text-framebox-secondary">{{$t(error)}}</span>

      <b-button block :disabled="processing" type="submit" variant="framebox-primary">{{$t('create_account').toUpperCase()}}</b-button>
    </b-form>
  </div>
</template>

<script>
import { REGISTER_USER } from "@/store/actions.types";

export default {
  name: "AuthRegisterForm",
  data() {
    return {
      user: {
        nickname: "",
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
        await this.$store.dispatch(REGISTER_USER, {user});
        this.$router.push({ name: "Home" });
      } catch (e) {
        // console.log(e);
        this.error = "invalid_credentials";
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