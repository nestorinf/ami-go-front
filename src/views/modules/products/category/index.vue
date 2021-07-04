<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
      </v-card-text>

      <v-col cols="12" lg="12" sm="12">
        <DataTable
          :dataButtonRegister="{
            title: 'Registrar',
            path: 'categories/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCategory"
        ></DataTable>
      </v-col>
    </v-card>
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Category",
  components: {
    DataTable,
    DialogConfirm,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Producto",
        disabled: false,
        to: "#",
      },
      {
        text: "Categoria",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Categoria",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        value: "name",
      },
      {
        text: "Descripción",
        value: "description",
      },
      {
        text: "Padre",
        sortable: false,
        value: "parent",
      },
      {
        text: "Habilitado",
        value: "enabled",
      },

      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: [],
    idDelete: "",
  }),
  computed: {
    ...mapGetters({ storeCategories: "category/getCategories" }),
  },
  watch: {
    storeCategories(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getCategoriesData: "category/getCategoriesData",
      removeCategory: "category/removeCategory",
    }),
    editButton({ id }) {
      this.$router.push("categories/edit/" + id);
    },
    acceptRemoveCategory(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeCategory(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },
  mounted() {
    this.getCategoriesData();
  },
};
</script>