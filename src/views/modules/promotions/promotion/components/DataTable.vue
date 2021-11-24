<template>
  <div class="mt-4">
    <v-card>
      <v-card-title>
        <ButtonRegister
          :title="dataButtonRegister.title"
          :path="dataButtonRegister.path"
        ></ButtonRegister>
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
        <template v-slot:[`item.action`]="{ item }" nowrap>
          <ButtonCrudTable
            :item="item"
            @handler-edit="editButton(item)"
            @handler-remove="removeButton(item)"
            @handler-entities="entitiesButton(item)"
          ></ButtonCrudTable>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ButtonRegister from "./ButtonRegister";
import ButtonCrudTable from "./ButtonCrudTable";

export default {
  name: "DataTable",
  props: {
    headers: Array,
    items: Array,
    dataButtonRegister: {
      title: String,
      path: String,
    },
  },
  components: {
    ButtonRegister,

    ButtonCrudTable,
  },
  methods: {
    editButton(item) {
      this.$emit("edit-button", item);
    },
    removeButton(item) {
      this.$emit("remove-button", item);
    },
    entitiesButton(item) {
      this.$emit("entities-button", item);
    },
  },
  data: () => ({
    search: "",
    loading: false,
  }),
};
</script>