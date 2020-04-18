<template>
  <b-nav-item-dropdown text="Lang" right>
    <b-dropdown-item
      v-for="(lang, key) in langs"
      :key="key"
      @click="onLangChange(lang)"
    >{{lang.toUpperCase()}}</b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: "LangSelector",
  data() {
    return {
      langs: ["en", "es"]
    };
  },

  mounted() {
    var lang = localStorage.getItem("lang");
    if (lang) {
      this.$i18n.locale = lang;
    }
  },

  methods: {
    onLangChange(lang) {
      localStorage.setItem('lang', lang);
      this.$i18n.locale = lang;
    }
  }
};
</script>