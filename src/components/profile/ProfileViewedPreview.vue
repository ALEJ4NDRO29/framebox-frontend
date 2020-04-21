<template>
  <b-card>
    <b-card-text>
      <div>
        <resource-icon-type class="icon" :type="viewed.resource.type.name" />
        <router-link
          :to="{name: 'ResourcesDetails', params: {slug: viewed.resource.slug}}"
        >{{viewed.resource.title}}</router-link>
      </div>
      <div>{{formatDate(viewed.createdAt)}}</div>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";
export default {
  name: "ProfileViewedPreview",
  props: {
    viewed: Object
  },
  components: {
    ResourceIconType
  },
  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}
</style>