<template>
  <div>
    <b-card>
      <b-card-text>
        <div>
          <router-link 
            :to="{name: 'ListDetails', params: {slug: list.slug}}"
            class="h2"
          >{{list.name}}</router-link>
        </div>
        <div>
            {{$t('created')}} {{formatDate(list.createdAt)}}
        </div>
        <div>
            {{$t('updated')}} {{formatDate(list.updatedAt)}}
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ListPreview",
  props: {
    list: Object
  },
  methods: {
    formatDate(dateStr) {
      var date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>