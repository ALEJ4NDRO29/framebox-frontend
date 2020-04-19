<template>
  <b-modal v-model="dialog.visible" hide-footer hide-header>
    {{$t(dialog.content)}}
    <b-button class="mt-3" variant="outline-dark" block @click="close">{{$t(dialog.close)}}</b-button>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { ALERT_CLOSE } from "@/store/actions.types";
export default {
  name: "DialogAlert",
  computed: {
    ...mapGetters({
      dialog: "getDialogAlert"
    })
  },
  methods: {
    close() {
      if (typeof this.dialog.onClose === "function") {
        this.dialog.onClose();
      }
      this.$store.dispatch(ALERT_CLOSE);
    }
  }
};
</script>
