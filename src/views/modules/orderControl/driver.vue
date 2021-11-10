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
        
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="filtros.byDateStart"
            type="date"
            label="Filtra por rango de Fecha Inicio"
            required
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>

        <v-col cols="12" lg="3">
          <v-text-field
            v-model="filtros.byDateEnd"
            type="date"
            label="Filtra por rango de Fecha Final"
            required
            filled
            background-color="transparent"
          ></v-text-field>
        </v-col>

        <v-col cols="12" lg="6">
          
          <v-select
            label="Filtra por Dirección de Comercio"
            :items="Lists.commerces"
            v-model="filtros.byCommercesId"
            filled
            required
            background-color="transparent"
          ></v-select>
        </v-col>
        
        <v-col cols="12">
          <DataTableOrderControl :headers="headers" :items="Lists.rows" @detail-button="detailButton">
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
    items: [],
    filtros: {
      byTypeCommercesAddress:'', //commerce, restaurant
      byCommercesId:'', //commerce_id, restaurant_id
      byDateStart:'', //commerce_id, restaurant_id
      byDateEnd:'', //commerce_id, restaurant_id
    },
  }),
  computed: {
    ...mapGetters({ storeOrderControl: "orderControl/getOrders" }),
      Lists () {
          var result = this.items;
          var byDateStart = this.filtros.byDateStart;
          var byDateEnd = this.filtros.byDateEnd;
          var byCommercesId = this.filtros.byCommercesId;
          var rows = [];
          var commerces = [];
          var unique = [];

          result.map((element) => {
            var ordenes = element.orders;
            
           unique.push( ordenes.filter(function(itm, i, a) {
                      return i == a.indexOf(itm);
                  })
            );
            
            if(byDateStart!=''){
              ordenes = ordenes.filter(items => items.date_delivery>=byDateStart);
            }
            if(byDateEnd!=''){
              ordenes = ordenes.filter(items => items.date_delivery<=byDateEnd);
            }
            if(byCommercesId!=''){
              ordenes = ordenes.filter(items => items.address==byCommercesId);
            }

            rows.push({
              id: element.id,
              driver: element.driver,
              orders: ordenes.length,
              amount: this.sumBy(ordenes),
            });
          });

          // if(this.select_type!='todos'){
          //   rows = rows.filter(notification => notification.entity==this.select_type);
          // }
            
            unique.map((element) => {
              element.map((elements) => {
                console.log('element',elements);
                commerces.push({                
                  value: elements.address,
                  text: elements.commerces
                });
              });
            });


            var results = {
              rows: rows,
              commerces: commerces
            };


          return results;

    },






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
    sumBy(data) {   
      var sum = 0;    
      data.map((element) => {
        sum += parseFloat(element.amount_delivery);
      });
      return sum;
    },
    
  },
  mounted() {
    
      this.getOrdersData()
        .then((result) => {
          if (result) {
            console.log(result);
            // result.map((element) => {
            //   rows.push({
            //     value: element.id,
            //     text: element.name,
            //   });
            //   this.commerceList = rows;
            // });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
        
  }, 
};
</script>