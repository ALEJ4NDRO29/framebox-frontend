<template>
  <div>
    <b-form @submit="onSubmit">
      <!-- TITLE -->
      <b-form-group id="input-group-title" :label="$t('title')" label-for="input-title">
        <b-form-input
          id="input-title"
          v-model="resource.title"
          type="text"
          :placeholder="$t('title')"
          autocomplete="off"
          required
        />
      </b-form-group>

      <!-- TYPE -->
      <b-form-group id="input-group-type" :label="$t('type')" label-for="input-type" v-if="types">
        <b-form-select
          id="input-type"
          v-model="resource.type"
          :options="types.types.map(a => a.name)"
          required
        />
      </b-form-group>

      <!-- DESCRIPTION -->
      <b-form-group
        id="input-group-description"
        :label="$t('description')"
        label-for="input-description"
      >
        <b-form-textarea
          id="input-description"
          v-model="resource.description"
          rows="6"
          type="text"
          :placeholder="$t('description')"
        />
      </b-form-group>

      <!-- IMAGEURL -->
      <b-form-group id="input-group-image-url" :label="$t('image_url')" label-for="input-image-url">
        <b-form-input
          id="input-image-url"
          v-model="resource.imageUrl"
          type="text"
          autocomplete="off"
          :placeholder="$t('image_url')"
        />
      </b-form-group>

      <!-- COMPANY -->
      <b-form-group id="input-group-company" :label="$t('company')" label-for="input-company">
        <b-form-input
          id="input-company"
          v-model="resource.company"
          type="text"
          autocomplete="off"
          :placeholder="$t('company')"
        />
      </b-form-group>

      <!-- RELEASEDAT -->
      <b-form-group
        id="input-group-released-at"
        :label="$t('released_at')"
        label-for="input-released-at"
      >
        <!-- FIXME: CSS COLORS -->
        <b-form-datepicker id="input-released-at" v-model="resource.releasedAt" class="mb-2"></b-form-datepicker>
      </b-form-group>
      <b-button type="submit" variant="framebox-primary" block> {{$t('confirm')}} </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  RESOURCE_ADMIN_LOAD,
  RESOURCE_ADMIN_UNLOAD
} from "@/store/actions.types";
export default {
  name: "ResourceForm",
  props: {
    resourceUpdate : Object
  },

  computed: {
    ...mapGetters({
      types: "getResourceTypes"
    })
  },

  data() {
    return {
      resource: {}
    };
  },
  
  mounted() {
    this.$store.dispatch(RESOURCE_ADMIN_LOAD);
    if(typeof this.resourceUpdate !== "undefined") {
      this.resource = Object.assign({}, this.resourceUpdate);
    }
  },
  
  beforeDestroy() {
    this.$store.dispatch(RESOURCE_ADMIN_UNLOAD);
  },
  
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.$emit('submit', this.resource);
    }
  }
};
</script>
