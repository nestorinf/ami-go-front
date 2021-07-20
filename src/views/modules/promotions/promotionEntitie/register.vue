<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}: {{form.name}}
        </h3>
      </v-card-text>
      <v-card-text>
        <v-row class="pb-10">
          <v-col cols="12" lg="12" sm="12">  
            <DataTable
              :type="form.type"
              :headers="headers"
              :items="ListEntities"
              :loading="true"
            >
            </DataTable>
          </v-col>
        </v-row>
        <v-btn
          color="success"
          @click="create"
          :disabled="!valid"
          submit
          class="text-capitalize mr-2"
          >Guardar</v-btn
        >
        <v-btn
          color="black"
          class="text-capitalize"
          to="/promotions/promotion"
          dark
          >Cancelar</v-btn
        >
      </v-card-text>
    </v-form>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DataTable from "./components/DataTable";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterPromotion",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    DataTable,
  },

  data() {
    return {

      headers: [
      {
        text: "Accion",
        sortable: false,
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        value: "name",
      },
      {
        text: "Tipo",
        align: "start",
        value: "type",
      },
    ],

      textSnackBar: "",
      titleForm: "Promoción",
      valid: true,
      form: {
        id: "",
        name: "",
        expire_date: "",
        type: "",
      },
      types: [{
        value: 'commerce',
        text: 'Comercios',
      },{
        value: 'restaurant',
        text: 'Restaurantes',
      }],
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        typeRule: [(v) => !!v || "este campo es obligatorio"],
      },

      ListEntities : [],
      entities : {
        promotion_id : '',
        entities : '',
        type : '',
      }

    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    
    EntitiesSelected(){
      var rows = [];
      var data = this.ListEntities;
      data.map((element) => {
        if(element.seleted){
          rows.push(
              element.id
          );
        }
      });
      return rows;
    },

    ...mapGetters({ 
        storePromotions: "promotion/getPromotions",
        storeCommerce: "commerce/getCommerces",
        storeRestaurant: "restaurant/getRestaurants"
    }),
  },

  methods: {
    ...mapActions({
      getPromotionById: "promotion/getPromotionById",

      createPromotionEntitie: "promotionEntitie/createPromotionEntitie",
      
      getCommercesData: "commerce/getCommercesData",
      getRestaurantsData: "restaurant/getRestaurantsData",

      // getCommercesData: "commerce/getCommercesData",
    }),
    setData() {

      if (this.id) {
        
        this.getPromotionById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            type: result.type,
            expire_date: result.expire_date,
            commerces_id: result.commerces_id,
            restaurates_id: result.restaurates_id,
          };

          this.SearchEntities();

        });
      }
    },

    create() {

      this.entities = {
        promotion_id: this.id,
        entities: this.EntitiesSelected,
        type: this.form.type
      };

      this.createPromotionEntitie(this.entities)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    SearchEntities() {
      this.ListEntities = [];
      if(this.form.type=='commerce'){        
        this.getCommercesData();
      }else if(this.form.type=='restaurant'){        
        this.getRestaurantsData();
      }
    },
  },
  watch: {
    storeCommerce(data) {
      const rows = [];      
      if (data.length > 0) {
        data.map((element) => {
          rows.push({
            id: element.id,
            name: element.name,
            type: element.commerce_type,
            seleted: this.form.commerces_id.includes(element.id)
          });
          this.ListEntities = rows;
        });
      }
    },
    storeRestaurant(data) {
      const rows = [];      
      if (data.length > 0) {
        data.map((element) => {
          rows.push({
            id: element.id,
            name: element.name,
            type: element.restaurant_type_name,
            seleted: this.form.restaurates_id.includes(element.id)
          });
          this.ListEntities = rows;
        });
      }
    },
  },
};
</script>