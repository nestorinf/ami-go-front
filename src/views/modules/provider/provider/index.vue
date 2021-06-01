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
            path: 'provider/register',
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
  name: "Provider",
  components: {
    DataTable,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Proveedor",
        disabled: false,
        to: "#",
      },
      {
        text: "Proveedor",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Proveedor",
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
      { text: "Agente", value: "agent" },
      { text: "Codigo", value: "code" },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "phone" },
    ],
    items: [
      {
        id: 1,
        name: "Electronic Sony",
        agent: "Carlos Perez",
        code: "J-8554411",
        email: "sony@sony.com",
        phone: "+53 698 954 25",
      },
    ],
  }),
};
</script>