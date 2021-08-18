<template>
  <div class="mt-4">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
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
          <ButtonCrudTable
            :item="item"
            @handler-remove="removeButton(item)"
          ></ButtonCrudTable>
        </template>
        <template v-slot:[`item.images`]="{ item }">
            <v-btn text small @click="ImagesButton(item)"> {{item.logo.length}} Imagenes</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ButtonCrudTable from "./ButtonCrudTable";

export default {
  name: "DataTable",
  props: {
    headers: Array,
    items: Array,
  },
  components: {
    ButtonCrudTable,
  },
  methods: {
    removeButton(item) {
      this.$emit("remove-button", item);
    },
    ImagesButton(item) {
      this.$emit("images-button", item);
    },
  },

  data: () => ({
    search: "",
    loading: false,
  }),
};
</script>