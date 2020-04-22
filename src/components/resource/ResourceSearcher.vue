<template>
  <form @submit="search">
    <b-input-group>
      <b-form-input
        v-model="q"
        list="autocomplete"
        autocomplete="off"
        type="text"
        :placeholder="$t('search')"
      ></b-form-input>
      <!-- TODO: Autocomplete -->
      <datalist id="autocomplete">
        <option value="test">
          <resource-icon-type type="Movie" />Test
        </option>
      </datalist>

      <!-- BTN SEARCH -->
      <b-input-group-append>
        <b-button :disabled="searching" @click="search" variant="framebox-secondary">
          {{$t('search')}}
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </form>
</template>

<script>
import ResourceIconType from "@/components/resource/ResourceIconType";
import { RESOURCES_SEARCH } from "@/store/actions.types";

export default {
  name: "ResourceSearch",
  components: {
    ResourceIconType
  },

  data() {
    return {
      searching: false,
      currentPage: 1,
      q: ""
    };
  },

  mounted() {
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
      this.search();
    }
  },

  methods: {
    async search(ev) {
      var search = this.q.trim();
      if (ev) {
        ev.preventDefault();
        // Comprobar que no se repita la búsqueda
        if (this.$route.query.q && search === this.$route.query.q.trim()) {
          return;
        }
        this.currentPage = 1;
      }

      if (!this.searching && search) {
        this.searching = true;
        try {
          if (this.q !== this.$route.query.q) {
            this.$router.push({ path: "", query: { q: search } });
          }

          var params = {
            page: this.currentPage,
            q: search,
            limit: 5
          };

          await this.$store.dispatch(RESOURCES_SEARCH, params);
        } finally {
          this.searching = false;
        }
      }
    },

    setPage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
        this.search();
      }
    }
  }
};
</script>
