<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Lotes
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los lotes
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          
          <v-col cols="12" lg="12">
            <v-select
              @change="ProductsByIdCommerce"
              :loading="loadingCommerces"
              label="Comercios"
              :items="commerces"
              v-model="commerce_id"
              filled
              :disabled="!!id"
              background-color="transparent"
              :error-messages="errorsBags.product_id"
            ></v-select>
          </v-col>
          
          <v-col cols="12" lg="12">
            <v-select
              @change="setPrecios"
              :loading="loadingProduct"
              label="Productos"
              :items="producList"
              v-model="form.product_id"
              filled
              :disabled="!!id"
              background-color="transparent"
              :rules="rules.product_idRule"
              :error-messages="errorsBags.product_id"
            ></v-select>
          </v-col>

          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.description"
              label="Descripción"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.unit_price"
              label="Precio unitario"
              type="number"
              prefix="$"
              required
              :rules="rules.unit_priceRule"
              background-color="transparent"
              :error-messages="errorsBags.unit_price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.regular_price"
              label="Precio regular"
              type="number"
              prefix="$"
              required
              :rules="rules.regular_priceRule"
              background-color="transparent"
              :error-messages="errorsBags.regular_price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
         <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.expired_date"
            label="Fecha de expiración (Dejar en blanco si no aplica)" 
            hint="Dejar en blanco si no aplica..."
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
            @click:clear="form.expired_date = null"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.expired_date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
          </v-col>
    
          <v-col cols="12" lg="12" class="pb-10">
            <v-switch v-model="form.status" inset label="Habilitado" hide-details></v-switch> 
          </v-col>
          
        </v-row>

        <v-row class="pt-10">
          <v-col cols="12" lg="12">
            <v-btn
              color="success"
              @click="save"
              :disabled="!valid"
              submit
              class="text-capitalize mr-2"
              >Guardar</v-btn
            >
            <v-btn
              color="black"
              class="text-capitalize"
              to="/products/batches"
              dark
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import { handleMessage } from "@/utils";
export default {
  name: "RegisterCategory",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },
 
  data() {
    return {
      menu2: false,
      textSnackBar: "",
      valid: true, 
      form: {
        id: "",
        product_id: "",
        description: "",
        status: true,
        unit_price: "",
        regular_price: "",
        expired_date:""
      },

      listProducts: [],
      producList: [],
      loadingProduct: false,
      
      errorsBags: [],

      rules: {
        product_idRule: [(v) => !!v || "el campo es obligatorio"],
        unit_priceRule: [(v) => !!v || "el campo es obligatorio"],
        regular_priceRule: [(v) => !!v || "el campo es obligatorio"],
      },

      commerce_id: '',
      commerces: [],
      loadingCommerces: false,
    

    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    
  },
  methods: {
    ...mapActions({
      createProductBatches: "productBatches/createProductBatches",
      ProductBatches: "productBatches/getProductBatchesById",
      updateProductBatches: "productBatches/updateProductBatches",

      productData: "product/getProductData",
      
      getProductsByIdCommerce: "commerce/getProductsByIdCommerce",
      commerceData: "commerce/getCommercesData",

    }),
    setPrecios(){
      var _this = this;
      var product_id = this.form.product_id;
      var listProducts = this.listProducts;
      
      listProducts.map((element) => {
        if(element.id==product_id){
          _this.form.unit_price = element.price;
          _this.form.regular_price = element.price;
        }
      });
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
       
      this.loadCommerces();
        
      if (this.id) {
        this.ProductBatches(this.id).then((result) => {

          this.commerce_id = result.commerce_id;
          this.form = Object.assign({}, result);
          
          this.ProductsByIdCommerce();   

        });

      }
    },

    create(payload) {
      this.createProductBatches(payload)
        .then((result) => {
          if (result) {
            this.$refs.form.reset();
            this.form.images_id = [];
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
            this.$router.push("/products/batchesDetail/detail/"+result.id);
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },

    update(payload) {
      this.updateProductBatches(payload)
        .then((result) => {
          if (result) {
            this.form = Object.assign({}, result);
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },
    
    loadCommerces() {
      const rows = [];
      this.commerces = [];
      this.loadingCommerces = true;
      this.commerceData(0)
        .then((result) => {
          if (result) {
            result.map((element) => {
              if (element.commerce_type !== "Restaurantes") {
                rows.push({
                  value: element.id,
                  text: element.name,
                });
              }
              this.commerces = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
    },

    ProductsByIdCommerce() {
      const rows = [];
      this.loadingProduct = true;
      this.getProductsByIdCommerce(this.commerce_id)
        .then((result) => {
          
          this.listProducts = result.products;

          if (result) {
            result.products.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.producList = rows;
            });
          }
          this.loadingProduct = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
    },
  },
};
</script>