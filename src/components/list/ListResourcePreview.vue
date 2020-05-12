<template>
  <b-card>
    <b-card-text>
      <b-row>
        <b-col lg="2" cols="4">
          <img
            class="img-fluid img-thumbnail"
            :src="getImageUrl()"
            :alt="listResource.resource.title"
          />
        </b-col>
        <b-col>
          <div class="h2">
            <resource-icon-type class="icon" :type="listResource.resource.type.name" />

            <router-link
              :to="{name: 'ResourcesDetails', params: {slug: listResource.resource.slug}}"
            >{{listResource.resource.title}}</router-link>
          </div>
          <div>
            <span>{{$t('added')}} — {{formatDate(listResource.createdAt)}}</span>
          </div>
          <div v-if="currentUser && currentUser.nickname === list.list.owner.nickname">
            <b-button
              @click="remove(listResource.resource.slug)"
              variant="outline-danger"
            >{{$t(removeText)}}</b-button>
          </div>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";
import { mapGetters } from "vuex";
import { List } from "../../common/api.service";

export default {
  name: "ListResourcePreview",
  props: {
    listResource: Object
  },

  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      list: "getCurrentList"
    })
  },

  data() {
    return {
      removeText: "remove",
      clickAgainToConfirmRemove: false
    };
  },

  components: {
    ResourceIconType
  },

  methods: {
    getImageUrl() {
      if (this.listResource.resource.imageUrl) {
        return this.listResource.resource.imageUrl;
      } else {
        return require("../../assets/default-movie.jpg");
      }
    },
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    },
    async remove(resourceSlug) {
      if (!this.clickAgainToConfirmRemove) {
        this.clickAgainToConfirmRemove = true;
        this.removeText = "click_again_to_remove";
        setTimeout(() => {
          this.clickAgainToConfirmRemove = false;
          this.removeText = "remove";
        }, 2000);
        return;
      }

      var resource = {
        resource: {
          slug: resourceSlug
        }
      };
      await List.removeContent(this.list.list.slug, resource);
      this.clickAgainToConfirmRemove = false;
      this.removeText = "remove";

      this.$emit("update");
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}
</style>