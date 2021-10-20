<template>
  <div class="mt-4">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        class="border"
      >
        <template v-slot:[`item.action`]="{ item }">
          <div class="d-inline-flex">
            <v-icon small @click="searchOrder(item)" class="mr-2"
              >mdi-feature-search-outline</v-icon
            >
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DataTableOrderControl",
  props: {
    headers: Array,
    items: Array,
  },

  methods: {
    searchOrder(item) {
      console.log(item);
      //   this.$emit("detail-button", item);
    },
  },
  data: () => ({
    search: "",
    loading: false,
  }),
};
</script>