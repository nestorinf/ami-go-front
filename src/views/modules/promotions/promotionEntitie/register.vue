<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}: {{form.name}} ({{form.to_entities}})
        </h3>
      </v-card-text>
      <v-card-text>
        <v-row class="pb-10">
          
          <v-col cols="12" lg="12" sm="12"> 
            <h3 class="title blue-grey--text text--darken-2 font-weight-regular" v-if="DataCommerces">
              Comercio: {{DataCommerces.name}}
            </h3>
          </v-col>
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
      DataCommerces: '',
      form: {
        id: "",
        name: "",
        expire_date: "",
        type: "",
        to_entities: "",
        commerce_id: "",
      },
      types: [{
        value: 'commerce',
        text: 'Comercios',
      },{
        value: 'restaurant',
        text: 'Restaurantes',
      },{
          value: "delivery_restaurant",
          text: "Delivery (Restaurantes)",
        },
        {
          value: "delivery_commerce",
          text: "Delivery (Comercios)",
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
      getProductsByIdCommerce: "commerce/getProductsByIdCommerce",
      getRestaurantsData: "restaurant/getRestaurantsData",

    }),
    setData() {

      if (this.id) {
        
        this.getPromotionById(this.id).then((result) => {
          console.log(result)
          this.form = {
            id: result.id,
            name: result.name,
            type: result.type,
            to_entities: result.to_entities,
            expire_date: result.expire_date,
            commerces_id: result.commerces_id,
            restaurates_id: result.restaurates_id,
            commerce_id: result.commerce_id,
            promotions_products: (result.promotions_products)?result.promotions_products:[],
          };

          this.SearchEntities();

        });
      }
    },

    loadCommerces(type) {
      this.getCommercesData(type);
    },

    create() {

      this.entities = {
        promotion_id: this.id,
        entities: this.EntitiesSelected,
        type: this.form.type,
        commerce_id: this.form.commerce_id
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
      if(this.form.type=='commerce' || this.form.type=='delivery_commerce'){        
        this.loadCommerces(0);
      }else if(this.form.type=='market' || this.form.type=='delivery_market'){        
        this.loadCommerces(1);
      }else if(this.form.type=='restaurant' || this.form.type=='delivery_restaurant'){        
        this.getRestaurantsData();
      }else if(this.form.type=='products'){        
        this.ProductsByIdCommerce();
      }
    },
    
    ProductsByIdCommerce() {
      const rows = [];
      this.getProductsByIdCommerce(this.form.commerce_id)
        .then((result) => {
          if (result) {
            this.DataCommerces = result;
            this.DataCommerces.products.map((element) => {
              rows.push({
                id: element.id,
                name: element.name,
                type: element.category.name,
                seleted: this.form.promotions_products.includes(element.id)
              });
              this.ListEntities = rows;
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
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
            type: element.commerce_type_name,
            seleted: this.form.commerce_id.includes(element.id)
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