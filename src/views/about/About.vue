<template>
  <div>
    <div class="text-center">
      <img alt="Framebox logo" src="../../assets/logo-h.png" class="img-fluid center" />
    </div>

      <b-row v-if="currentUser">
        <b-col cols="12" lg="6" offset-lg="3">
          <suggestion-form />
        </b-col>
      </b-row>
    
    <div v-else>
      <span>
        <router-link :to="{name: 'Login'}">{{$t('login')}}</router-link>
        {{$t('to_send_suggestion')}}.
      </span>
    </div>
  </div>
</template>

<script>
import SuggestionForm from "@/components/suggestion/SuggestionForm";
import { mapGetters } from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  components: {
    SuggestionForm
  }
};
</script>
