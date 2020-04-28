<template>
  <b-card>
    <b-card-text>
      <div class="h2">
        <resource-icon-type :type="suggestion.type.name" />
        {{suggestion.title}}
      </div>

      <div>
        <router-link
          :to="{name: 'Profile', params: {nickname: suggestion.profile.nickname}}"
        >{{suggestion.profile.nickname}}</router-link>
      </div>

      <div>
        <strong>{{$t('state')}}</strong>
        — {{$t(suggestion.state)}}
      </div>
      <div>
        <strong>{{$t('created')}}</strong>
        {{formatDate(suggestion.createdAt)}}
      </div>
      <div v-if="suggestion.releasedAt">
        <strong>{{$t('released_at')}}</strong>
        {{formatShortDate(suggestion.releasedAt)}}
      </div>
      <div v-if="suggestion.imageUrl">
        <span>
          <strong>{{$t('image_url')}}&nbsp;</strong>
          <a :href="suggestion.imageUrl" target="_blank">{{suggestion.imageUrl}}</a>
        </span>
      </div>

      <div v-if="suggestion.description">
        <div>
          <strong>— {{$t('description')}}</strong>
        </div>
        <pre class="default">{{suggestion.description}}</pre>
      </div>

      <div v-if="currentUser.isAdmin">
        <b-button-group>
          <b-button
            :variant="suggestion.state !== 'In_course' ? 'framebox-primary' : ''"
            @click="setState('In_course')"
          >{{$t('In_course')}}</b-button>
          <b-button
            :variant="suggestion.state !== 'Accepted' ? 'framebox-primary' : ''"
            @click="setState('Accepted')"
          >{{$t('Accepted')}}</b-button>
          <b-button
            :variant="suggestion.state !== 'Denied' ? 'framebox-primary' : ''"
            @click="setState('Denied')"
          >{{$t('Denied')}}</b-button>
          <b-button
            :variant="suggestion.state !== 'Received' ? 'framebox-primary' : ''"
            @click="setState('Received')"
          >{{$t('Received')}}</b-button>
          <b-button variant="outline-danger" @click="remove(suggestion.slug)">{{$t(removeText)}}</b-button>
        </b-button-group>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";
import { mapGetters } from "vuex";
import { Suggestion } from "../../common/api.service";

export default {
  name: "SuggestionPreview",
  components: {
    ResourceIconType
  },

  data() {
    return {
      removeText: "remove",
      clickAgainToConfirmRemove: false
    };
  },

  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },

  props: {
    suggestion: Object
  },

  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    },

    formatShortDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString();
    },

    async setState(updateState) {
      var state = {
        name: updateState
      };
      await Suggestion.setState(this.suggestion.slug, { state });
      this.$emit("update");
    },

    async remove(suggestionSlug) {
      if (!this.clickAgainToConfirmRemove) {
        this.clickAgainToConfirmRemove = true;
        this.removeText = "click_again_to_remove";
        setTimeout(() => {
          this.clickAgainToConfirmRemove = false;
          this.removeText = "remove";
        }, 2000);
        return;
      }

      await Suggestion.remove(suggestionSlug);

      this.clickAgainToConfirmRemove = false;
      this.removeText = "remove";
      
      this.$emit("update");
    }
  }
};
</script>