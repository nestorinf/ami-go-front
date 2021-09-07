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
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import SnackBar from "@/views/modules/components/SnackBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Category",
  components: {
    DataTable,
    DialogConfirm,
    SnackBar,
  },

  data: () => ({
      textSnackBar: "",
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
      errorsBags: [],
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
       this.removeCategory(this.idDelete)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";
          }
        }).catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, No se puede eliminar esta Categoria";
        });

      this.$refs.DialogConfirm.changeStateDialog(false); 
    }, 
  },
  mounted() {
    this.getCategoriesData('COMMERCE');
  },
};
</script>