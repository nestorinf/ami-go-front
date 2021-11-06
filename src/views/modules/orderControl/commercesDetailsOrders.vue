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
          {{ titleForm }}  <v-icon small @click="getOrdersData()" class="mr-2"
              >mdi-feature-search-outline</v-icon
            >
        </h3>
      </v-card-text>

      <v-row  class="pa-5">
        <v-col cols="6">
          <v-select
            label="Filtrar Por Tipo Comercio"
            :items="TiposList"
            v-model="select_type"
            filled
            required
            background-color="transparent"
          ></v-select>
        </v-col>
      </v-row>

      <v-row  class="pa-5">
        <v-col cols="12">
          <DataTableOrderControl :headers="headers" :items="Lists" 
              @detail-button="detailButton">
          </DataTableOrderControl>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import ButtonRegister from "../../components/ButtonRegister";
// import ButtonCrudTable from "../../components/ButtonCrudTable";
import DataTableOrderControl from "./components/DataTable";
import { mapActions } from "vuex";

export default {
  props: ['type','id'],
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
        text: "Comercio/Restaurante",
        disabled: true,
      },
    ],
    messageDialog: "",

    titleForm: "Listado de ordenes entregas a cliente",
    headers: [
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
        text: "Fecha Orden",
        value: "date_order",
      },
      {
        text: "Monto total",
        value: "grand_total",
      }
      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: [],
    TiposList: [{
        value: 'todos',
        text: 'Todos los Tipos',
    },{
        value: 'commerce',
        text: 'Comercios',
    },{
        value: 'restaurant',
        text: 'Restaurantes',
    }],
    idDelete: "",
    select_type: "todos",
  }),
  computed: {
     Lists () {
      var rows = this.items;
      if(this.select_type!='todos'){
        rows = rows.filter(notification => notification.entity==this.select_type);
      }

      return rows;

    },
  }, 
  methods: {
    ...mapActions({
      getOrdersData: "orderControl/getOrdersDataCommerceByID",
      getLoadStatus: "referenceList/getReferenceListByReferenceSlugData",
    }),
    detailButton(data) {
      console.log('data',data);
       
      this.$router.push("/order-control/edit/"+data.entity+"/" + data.order);
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
    console.log(this.id);
    
        this.getOrdersData({'type':this.type, 'id':this.id}).then((result) => {
         console.log(result);
         this.items = result;
        });

    this.getOrdersData({'type':this.type, 'id':this.id});
  }, 
};
</script>