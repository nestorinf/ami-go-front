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
      <v-row  class="pa-5">
        <v-col cols="12">
          <DataTableOrderControl :headers="headers" :items="items" @detail-button="detailButton">
          </DataTableOrderControl>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import DataTableOrderControl from "./components/DataTable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReporteGananciaConductor",
  components: {
    DataTableOrderControl,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Reporte Ganancia Conductor",
        disabled: false,
        to: "#",
      },
      {
        text: "Ganacias por Conductor",
        disabled: true,
      },
    ],
    messageDialog: "",

    titleForm: "Listado de Conductores",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Conductor",
        align: "start",
        value: "driver",
      },
      {
        text: "Nros Ordenes",
        value: "orders",
      },
      {
        text: "Monto Total",
        value: "amount",
      }
      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: []
  }),
  computed: {
    ...mapGetters({ storeOrderControl: "orderControl/getOrders" }),
  },
  watch: {
    storeOrderControl(data) {
      console.log('data',data);
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getOrdersData: "orderControl/getOrdersDriverData",
    }),
    detailButton(data) {
      console.log('data',data);       
      this.$router.push("/order-control/driver/"+data.id);
    },
  },
  mounted() {
    this.getOrdersData();
  }, 
};
</script>