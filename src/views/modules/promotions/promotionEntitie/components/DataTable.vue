<template>
  <div> 
    <h3 class="font-weight-light">
      Marcar la casilla si la promoción es valido para algunos {{Types.titulo}}
    </h3>
    
    <v-card>
      <v-card-title> 
        {{Types.titulo_tabla}}
        <v-spacer></v-spacer>
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
        <template v-slot:[`item.action`]="{ item }">          
          <v-checkbox
            v-model="item.seleted"
          ></v-checkbox>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "DataTable",
  props: {
    headers: Array,
    items: Array,
    type: String,
  },
  components: {
  },
  methods: {
  },
  data: () => ({
    search: "",
    loading: false,
  }),
  computed: {
    Types(){
      var type = this.type;
      if(type=='commerce' || type=='delivery_commerce'){
        return {titulo : 'comercios', titulo_tabla : 'Comercios Disponibles'}
      }
      if(type=='restaurant' || type=='delivery_restaurant'){
        return {titulo : 'restaurantes', titulo_tabla : 'Restaurantes Disponibles'}
      }
      if(type=='products'){
        return {titulo : 'productos', titulo_tabla : 'Productos Disponibles'}
      }
      
      return {titulo : null, titulo_tabla : null}
    }
  },
};
</script>