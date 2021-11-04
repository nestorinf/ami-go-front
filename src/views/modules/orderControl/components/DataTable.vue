<template>
  <div class="mt-4">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        class="border"
      >

        <template v-slot:[`item.state`]="{ item }">
        {{item.state | setStatus}}
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <div class="d-inline-flex">
            <v-icon small @click="searchOrder(item)" class="mr-2"
              >mdi-feature-search-outline</v-icon
            >
          </div>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DataTableOrderControl",
  props: {
    headers: Array,
    items: Array,
  },

  methods: {
    searchOrder(item) {
      console.log(item);
        this.$emit("detail-button", item);
    },
  },
  data: () => ({
    search: "",
    loading: false,   
  }),
  filters: {   
      setStatus: function (value) {    
        var data = null;
          switch (value) {
              case 'pending':
                  data = 'Pendiente';
                  break; 
              case 'paid':
                  data =  'Pagada';
                  break; 
              case 'programed':
                  data =  'Programada';
                  break; 
              case 'preparing':
                  data =  'En Preparación';
                  break; 
              case 'assigned-to-driver':
                  data =  'Asignada A Driver';
                  break; 
              case 'picked-up':
                  data =  'Recogida';
                  break; 
              case 'on-the-way':
                  data =  'En Camino';
                  break; 
              case 'delivered':
                  data =  'Entregada A Cliente';
                  break;  
              case 'received':
                  data =  'Recibida Por Cliente';
                  break;  
              case 'completed':
                  data =  'Completada';
                  break;  
              case 'cancelled':
                  data =  'Cancelada';
                  break;  
              case 'refunded':
                  data =  'Reembolsada';
                  break;  
              case 'checkout':
                  data =  'Por Verificar';
                  break;  
              case 'waiting-to-driver':
                  data =  'En espera por Driver';
                  break;             
              default:
                  data =  'Estatus no valido';
                  break;
          }   
      return data;
      },
  },
};
</script>