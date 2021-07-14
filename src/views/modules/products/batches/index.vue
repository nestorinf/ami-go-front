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
            path: 'batches/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveProductBatches"
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
  name: "ProductsBatches",
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
        text: "Lotes",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Lotes",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Producto",
        align: "start",
        value: "product",
      },
      {
        text: "Nombre",
        align: "start",
        value: "name",
      },
      {
        text: "Stock",
        value: "stock",
      },
      {
        text: "Stock minimo",
        value: "stock_min",
      },
      {
        text: "Estatu",
        value: "status",
      },
      {
        text: "Precio Unitario",
        value: "unit_price",
      },
      {
        text: "Precio Regular",
        value: "regular_price",
      },
      {
        text: "Fecha de expiración",
        value: "expired_date",
      },
      {
        text: "Color",
        value: "colour",
      },
      {
        text: "Talla",
        value: "size",
      },

      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: [],
    idDelete: "",
  }),
  computed: {
    ...mapGetters({ storeProductsBatches: "productBatches/getProductsBatches" }),
  },
  watch: {
    storeProductsBatches(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
        console.log(this.items);
      }
    },
  },
  methods: {
    ...mapActions({
      getProductsBatchesData: "productBatches/getProductsBatchesData",
      removeProductBatches: "productBatches/removeProductBatches",
    }),
    editButton({ id }) {
      this.$router.push("batches/edit/" + id);
    },
    acceptRemoveProductBatches(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeProductBatches(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },
  mounted() {
    this.getProductsBatchesData();
  },
};
</script>