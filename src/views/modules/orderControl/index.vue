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

      <DataTableOrderControl :headers="headers" :items="items">
      </DataTableOrderControl>
    </v-card>
  </v-container>
</template>

<script>
// import ButtonRegister from "../../components/ButtonRegister";
// import ButtonCrudTable from "../../components/ButtonCrudTable";
import DataTableOrderControl from "./components/DataTable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PaymentType",
  components: {
    DataTableOrderControl,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Control de Ordenes",
        disabled: false,
        to: "#",
      },
      {
        text: "Tipo de Pago",
        disabled: true,
      },
    ],
    messageDialog: "",

    titleForm: "Control de Ordenes",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nro. Orden",
        value: "order",
      },
      {
        text: "Cliente",
        align: "start",
        value: "client",
      },
      {
        text: "Comercio / Restaurante",
        align: "start",
        value: "commerce",
      },
      {
        text: "Fecha Orden",
        value: "date_order",
      },
      {
        text: "Monto Total",
        value: "grand_total",
      },
      {
        text: "Estatus",
        value: "state",
      },

      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: [],
    idDelete: "",
  }),
  computed: {
    ...mapGetters({ storeOrderControl: "orderControl/getOrders" }),
  },
  watch: {
    storeOrderControl(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getOrdersData: "orderControl/getOrdersData",
    }),
    editButton({ id }) {
      this.$router.push("payment-type/edit/" + id);
    },
    acceptRemovePaymentType(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removePaymentType(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },
  mounted() {
    this.getOrdersData();
  },
};
</script>