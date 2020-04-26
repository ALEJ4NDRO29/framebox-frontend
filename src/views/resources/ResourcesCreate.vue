<template>
  <div>
    <b-row>
      <b-col cols="12" lg="6" offset-lg="3">
        <h1>{{$t('create_resource')}}</h1>
        <resource-form @submit="submit" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourceForm from "@/components/resource/ResourceForm";
import { Resource } from "../../common/api.service";

export default {
  name: "ResourcesCreate",
  components: {
    ResourceForm
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  mounted() {
    if (!this.currentUser.isAdmin) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    async submit(resourceCreate) {
      var res = await Resource.create(resourceCreate);
      var created = res.data;
      
      this.$router.push({
        name: "ResourcesDetails",
        params: { slug: created.resource.slug }
      });
    }
  }
};
</script>
