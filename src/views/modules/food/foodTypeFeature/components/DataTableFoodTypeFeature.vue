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
        <template v-slot:[`item.action`]="{ item }">
          <ButtonCrudTable
            :item="item"
            @handler-edit="editButton(item)"
            @handler-remove="removeButton(item)"
          ></ButtonCrudTable>
        </template>

        <template v-slot:[`item.values.is_required`]="{ item }">
          {{ item.values.is_required ? 'Sí' : 'No'}}
        </template>

        <template v-slot:[`item.values.is_multiple`]="{ item }">
          {{ item.values.is_multiple ? 'Sí' : 'No'}}
        </template>

        <template v-slot:[`item.values.price`]="{ item }">
          {{ item.values.price ? 'Sí' : 'No'}}
        </template>

        <template v-slot:[`item.enabled`]="{ item }">
          {{ item.enabled ? 'Sí' : 'No'}}
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ButtonRegister from "../../../components/ButtonRegister";
import ButtonCrudTable from "../../../components/ButtonCrudTable";

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
  },
  data: () => ({
    search: "",
    loading: false,
  }),
};
</script>