<template>
  <b-card>
    <b-card-text>
      <div>
        <resource-icon-type :type="resource.type.name" />

        <router-link
          :to="{name: 'ResourcesDetails', params: {slug: resource.slug}}"
        >{{resource.title}}</router-link>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";

export default {
  name: "ResourcePreview",
  props: {
    resource: Object
  },
  components: {
    ResourceIconType
  }
};
</script>