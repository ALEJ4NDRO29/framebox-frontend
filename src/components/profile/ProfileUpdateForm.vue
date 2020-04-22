<template>
  <div>
    <span class="text-center">- {{profile.profile.nickname}} -</span>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-name" :label="$t('name')" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="profile.profile.name"
          autocomplete="off"
          type="text"
          :placeholder="$t('name')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-bio" :label="$t('website')" label-for="input-website">
        <b-form-input
          id="input-website"
          v-model="profile.profile.website"
          autocomplete="off"
          type="text"
          :placeholder="$t('website')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-bio" :label="$t('status')" label-for="input-status">
        <b-form-input
          id="input-status"
          v-model="profile.profile.status"
          autocomplete="off"
          type="text"
          :placeholder="$t('status')"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-bio" :label="$t('bio')" label-for="input-bio">
        <b-form-textarea
          id="input-bio"
          v-model="profile.profile.bio"
          type="text"
          :placeholder="$t('bio')"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" block variant="framebox-primary">{{$t('update')}}</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Profile } from "../../common/api.service";
export default {
  name: "ProfileUpdateForm",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      profile: "getProfileUpdating"
    })
  },
  methods: {
    async onSubmit(ev) {
      ev.preventDefault();

      await Profile.updateCurrent(this.profile);

      this.$router.push({
        name: "Profile",
        params: { nickname: this.profile.profile.nickname }
      });
    }
  }
};
</script>