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
            path: 'food/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @add-feature-button="addFeatureButton"
          @remove-button="acceptRemoveFood"
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
import DataTable from "./components/DataTableFood";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Company",
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
        text: "Comidas",
        disabled: false,
        to: "#",
      },
      {
        text: "Comidas",
        disabled: true,
      },
    ],
    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Comida",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      { text: "Restaurante", value: "restaurant_name" },
      { text: "Categoría", value: "category_name" },
      { text: "Nombre", value: "name" },
      { text: "Descripción", value: "description" },
      // { text: "Imagen", value: "image_id" },
      { text: "Ingredientes", value: "ingredients" },
      { text: "UDM", value: "uom_name" },
      { text: "Precio", value: "price" },
      { text: "Descuento", value: "discount" },
      { text: "Taxes", value: "tax" },
      { text: "Peso", value: "weight" },
      { text: "¿Con Características?", value: "with_features_formatted" },
      { text: "¿En Stock?", value: "is_stock_formatted" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({
      storeFoods: "food/getFoods",
    }),
  },
  watch: {
    storeFoods(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
        console.log(this.items);
      }
    },
  },
  methods: {
    ...mapActions({
      getFoodData: "food/getFoodData",
      removeFood: "food/removeFood",
    }),
    editButton({ id }) {
      this.$router.push("food/edit/" + id);
    },
    addFeatureButton({ id }) {
      this.$router.push("food/features/" + id);
    },
    acceptRemoveFood(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeFood(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getFoodData();
  },
};
</script>