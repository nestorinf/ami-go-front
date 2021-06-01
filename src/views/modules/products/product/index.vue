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
        ></DataTable>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";

export default {
  name: "Product",
  components: {
    DataTable,
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
        text: "Producto",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Producto",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "SKU", value: "sku" },
      { text: "Descripcion", value: "description" },
      { text: "Condiciones", value: "conditions" },
      { text: "Categoria", value: "category" },
      { text: "Proveedor", value: "provider" },
    ],
    items: [
      {
        id: 1,
        name: "Sonido home Theater HD",
        sku: "SNT-00001",
        description: "Sonido embolvente",
        conditions: "Este equipo su garantia es de 6 meses",
        category: "Equipo de sonido",
        provider: "Electronic Sony",
      },
    ],
  }),
};
</script>