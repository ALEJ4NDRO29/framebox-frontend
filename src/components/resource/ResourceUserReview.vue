<template>
  <div v-if="currentUser">
    <!-- REVIEW FORM -->
    <div v-if="isEditing">
      <review-form @create="create" @update="update" @cancel="cancel" :review="myReview.review" />
    </div>
    <div v-if="myReview && myReview.review && !isEditing">
      <p>{{$t('my_review')}}</p>

      <!-- REVIEW -->
      <b-card>
        <b-card-text>
          <h2>
            <resource-icon-type class="icon" :type="myReview.review.resource.type.name" />
            <router-link
              :to="{name: 'ResourcesDetails', params: {slug: myReview.review.resource.slug}}"
            >{{myReview.review.resource.title}}</router-link>
          </h2>

          <div>
            {{formatDate(myReview.review.createdAt)}}
            <font-awesome-icon icon="star" />
            {{myReview.review.rate}}
          </div>

          <small>
            <router-link
              :to="{name: 'Profile', params: {nickname: myReview.review.profile.nickname}}"
            >{{myReview.review.profile.nickname}}</router-link>
          </small>

          <div>{{myReview.review.review}}</div>
        </b-card-text>
      </b-card>

      <!-- ACTION BUTTONS -->
      <div>
        <b-button @click="edit" variant="framebox-primary">{{$t('edit')}}</b-button>
        <b-button @click="remove" variant="outline-danger">{{$t(removeText)}}</b-button>
      </div>
    </div>
    <!-- CREATE -->
    <div v-else-if="!isEditing">
      <b-button @click="edit" variant="framebox-primary">{{$t('create_review')}}</b-button>
    </div>
    <hr />
  </div>
  <!-- LOGIN FOR REVIEW -->
  <div v-else>
    <router-link :to="{name: 'Login'}">{{$t('login')}}</router-link>
    {{$t('to_add_review')}}.
    <hr />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResourceIconType from "@/components/resource/ResourceIconType";
import ReviewForm from "@/components/reviews/ReviewForm";
import {
  RESOURCE_USER_REVIEW_CREATE,
  RESOURCE_USER_REVIEW_UPDATE,
  RESOURCE_USER_REVIEW_REMOVE
} from "@/store/actions.types";

export default {
  name: "ResourceUserReview",
  components: {
    ResourceIconType,
    ReviewForm
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      myReview: "getResourceMyReview"
    })
  },

  data() {
    return {
      removeText: "remove",
      isEditing: false,
      isCreating: false,
      clickAgainToConfirmRemove: false
    };
  },

  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    },
    edit() {
      this.isEditing = true;
    },
    remove() {
      if (!this.clickAgainToConfirmRemove) {
        this.clickAgainToConfirmRemove = true;
        this.removeText = "click_again_to_remove";
        setTimeout(() => {
          this.clickAgainToConfirmRemove = false;
          this.removeText = "remove";
        }, 2000);
        return;
      }

      this.$store
        .dispatch(RESOURCE_USER_REVIEW_REMOVE, this.myReview.review)
        .then(() => {
          this.$emit("refresh");
        });
    },

    // FROM REVIEW FORM
    async create(review) {
      if (typeof review.rate === "undefined") return;
      await this.$store.dispatch(RESOURCE_USER_REVIEW_CREATE, review);
      this.isEditing = false;
      this.$emit("refresh");
    },
    async update(review) {
      if (typeof review.rate === "undefined") return;
      try {
        await this.$store.dispatch(RESOURCE_USER_REVIEW_UPDATE, review);
        this.$emit("refresh");
      } finally {
        this.isEditing = false;
      }
    },
    cancel() {
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.icon {
  margin-right: 10px;
}

button {
  margin-right: 5px;
}
</style>