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
            path: 'commerce-type/register',
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
  name: "Company",
  components: {
    DataTable,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Configuracion",
        disabled: false,
        to: "#",
      },
      {
        text: "Tipo de Comercio",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Tipo de Comercio",
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
      { text: "Descripcion", value: "description" },
    ],
    items: [
      {
        id: 1,
        name: "Super Mercado",
        description: "Tipo de Comercio Super Mercado",
      },
      {
        id: 2,
        name: "Tiendas",
        description: "Tipo de Comercio Tiendas",
      },
      {
        id: 3,
        name: "Restaurantes",
        description: "Tipo de Comercio Restaurantes",
      },
    ],
  }),
};
</script>