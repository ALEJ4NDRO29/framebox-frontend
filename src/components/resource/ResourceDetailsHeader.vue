<template>
  <div v-if="resource">
    <b-row>
      <b-col cols="12" sm="3">
        <img
          class="img-fluid img-thumbnail"
          :src="`${getImageUrl()}`"
          :alt="`${resource.resource.title}-image`"
        />

        <!-- IF ADMIN UPDATE BTN -->
        <b-row class="btn-spacing" v-if="currentUser && currentUser.isAdmin">
          <b-button
            :to="{name: 'ResourcesConfigure', params: {slug: resource.resource.slug}}"
            variant="framebox-primary"
            block
          >{{$t('update')}}</b-button>
        </b-row>

        <!-- AÑADIR A LIST -->
        <div v-if="currentUser">
          <resource-add-to-list />
        </div>

        <b-row>
          <b-col>
            <!-- VIEWED -->
            <b-button
              :disabled="loading"
              @click="setViewed()"
              v-if="currentUser === null || isViewed"
              block
            >
              <!-- FIXME : SPAN IN BUTTON -->
              <span v-if="currentUser !== null && isViewed.viewed">
                <!-- Viewed -->
                {{formatDate(isViewed.viewed.createdAt)}}
                <br />
                <font-awesome-icon icon="eye" />
              </span>
              <span v-else>
                <!-- Not viewed -->
                <font-awesome-icon icon="eye-slash" />
              </span>
            </b-button>
          </b-col>
          <b-col v-if="rateAverage">
            {{$t('average')}}: {{rateAverage.rate.value}}
            <br />
            {{$t('total')}}: {{rateAverage.rate.count}}
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" sm="9">
        <div>
          <h1>
            <resource-icon-type :type="resource.resource.type.name" />
            {{resource.resource.title}}
          </h1>
        </div>

        <div
          class="date"
          v-if="resource.resource.releasedAt"
        >{{formatDate(resource.resource.releasedAt)}}</div>

        <pre class="default" v-if="resource.resource.description">{{resource.resource.description}}</pre>

        <reviews-resource-list />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourceIconType from "@/components/resource/ResourceIconType";
import ResourceAddToList from "@/components/resource/ResourceAddToList";
import ReviewsResourceList from "@/components/reviews/ReviewsResourceList";
import {
  RESOURCES_REMOVE_VIEWED,
  RESOURCES_ADD_VIEWED
} from "@/store/actions.types";

export default {
  name: "ResourceDetailsHeader",
  components: {
    ResourceIconType,
    ReviewsResourceList,
    ResourceAddToList
  },
  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      resource: "getResourceDetails",
      isViewed: "isResourceViewed",
      rateAverage: "getResourceRateAverage"
    })
  },

  methods: {
    getImageUrl() {
      if (this.resource.resource.imageUrl) {
        return this.resource.resource.imageUrl;
      } else {
        return require("../../assets/default-movie.jpg");
      }
    },

    formatDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString();
    },

    async setViewed() {
      try {
        this.loading = true;
        if (this.currentUser === null) {
          this.$router.push({ name: "Login" });
        } else if (this.isViewed.viewed) {
          await this.$store.dispatch(
            RESOURCES_REMOVE_VIEWED,
            this.resource.resource.slug
          );
        } else {
          await this.$store.dispatch(
            RESOURCES_ADD_VIEWED,
            this.resource.resource.slug
          );
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.date,
.btn-spacing {
  margin-bottom: 15px;
}
img {
  margin-bottom: 10px;
}
</style>