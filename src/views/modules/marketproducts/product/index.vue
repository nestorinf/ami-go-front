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
            path: 'product/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemove"
        ></DataTable>
      </v-col>
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

    </v-card>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "Product",
  components: {
    DataTable,
    DialogConfirm,
    SnackBar,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Producto Super mercado",
        disabled: false,
        to: "#",
      },
      {
        text: "Producto",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Producto",
    messageDialog: "",
    textSnackBar: "",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Super Mercado",
        align: "start",
        sortable: true,
        value: "commerce",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "SKU", value: "sku", sortable: true },
      { text: "Descripcion", value: "description" },
      { text: "Condiciones", value: "conditions" },
      { text: "Categoria", value: "category" },
      { text: "Proveedor", value: "provider" },
      { text: "Habilitado", value: "enabled" },
    ],
    items: [],
  }),
  computed: {
    ...mapGetters({ storeProducts: "product/getProducts" }),
  },
  watch: {
    storeProducts(data) {
      const rows = [];
      this.items = rows;
      if (data.length > 0) {
        data.map((element) => {
          rows.push({
            id: element.id,
            commerce: element.commerce.name,
            name: element.name,
            sku: element.sku,
            enabled: element.enabled,
            description: element.description || "",
            conditions: element.conditions,
            category: element.category_name,
            provider: element.provider_name,
          });
        });
        this.items = rows;
      }
      console.log(data);
    },
  },

  methods: {
    ...mapActions({
      getProductData: "product/getProductData",
      removeProduct: "product/removeProduct",
    }),

    editButton({ id }) {
      this.$router.push("product/edit/" + id);
    },
    acceptRemove(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() { 
      this.removeProduct(this.idDelete)
      .then((result) => {
          if (result) {
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Eliminado existosamente!";
          }
      })
      .catch((result) => {       
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = result.response.data.message;
      });
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getProductData(1);
  },
};
</script>