<template>
  <div>
    <!-- <b-pagination :total-rows="5" size="sm"></b-pagination>

    <b-pagination
      v-model="currentPage"
      :total-rows="30"
      :pages="20"
      @input="change"
    ></b-pagination> -->
 
    <v-pagination v-model="currentPage" @input="change" :page-count="30"></v-pagination>

  </div>
</template>

<script>
export default {
  name: "ReviewsList",
  data() {
    return {
      currentPage: 10
    };
  },
  methods: {
    change() {
      console.log(this.currentPage)
    }
  }
};
</script>
