<template>
  <font-awesome-icon v-if="icon" :icon="icon" />
</template>

<script>
export default {
  name: "ResourceIconType",
  props: {
    type: String
  },

  data() {
    return {
      icon: ""
    };
  },

  mounted() {
    switch (this.type) {
      case "Serie":
        this.icon = "couch";
        break;
      case "Movie":
        this.icon = "film";
        break;
      case "Music":
        this.icon = "music";
        break;
      case "Videogame":
        this.icon = "gamepad";
        break;
    }
  }
};
</script>
