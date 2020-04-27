<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-name" :label="$t('name')" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="list.name"
          :placeholder="$t('name')"
          autocomplete="off"
          required
        />
      </b-form-group>

      <b-form-group
        id="input-group-description"
        :label="$t('description')"
        label-for="input-description"
      >
        <b-form-textarea
          id="input-description"
          v-model="list.description"
          :placeholder="$t('description')"
          rows="6"
        />
      </b-form-group>
      <b-form-checkbox
        id="checkbox-private"
        v-model="list.private"
        name="checkbox-private"
      >{{$t('private')}}</b-form-checkbox>

      <b-button class="submit" type="submit" variant="framebox-primary" block>{{$t('confirm')}}</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ListForm",
  props: {
    listUpdating: Object
  },

  mounted() {
    if (this.listUpdating) {
      this.list = Object.assign({}, this.listUpdating.list);
    }
  },

  data() {
    return {
      list: {}
    };
  },

  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.$emit("submit", this.list);
    }
  }
};
</script>

<style scoped>
.submit {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>