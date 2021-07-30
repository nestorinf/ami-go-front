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
              v-model="form.name"
              label="Nombre"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
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
              v-model="form.stock"
              label="Cantidad en existencia"
              type="number"
              min="0.1"
              filled
              required
              :rules="rules.stockRule"
              background-color="transparent"
              :error-messages="errorsBags.stock"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.stock_min"
              label="Cantidad minima"
              type="number"
              filled
              required
              :rules="rules.stock_minRule"
              background-color="transparent"
              :error-messages="errorsBags.stock_min"
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
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingColour"
              label="Color"
              :items="colourList"
              v-model="form.colour_id"
              filled
              multiple
              chips
              background-color="transparent"
              :error-messages="errorsBags.colour_id"
            ></v-select>
          </v-col>      
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingSize"
              label="Talla"
              :items="sizeList"
              v-model="form.size_id"
              filled
              multiple
              chips
              background-color="transparent"
              :error-messages="errorsBags.size_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12" class="pb-10">
            <v-switch v-model="form.status" inset label="Habilitado" hide-details></v-switch> 
          </v-col>
          
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
            <UploadImages v-if="displayed" :max="50" @change="onFileSelected" />
          </v-col>
        </v-row>
        
        <ShowsImages :items="form.imagenes" v-if="id" @delete-imagen="deleteImagen"></ShowsImages>
        
      
        <v-row class="pt-10">
          <v-col cols="12" lg="12">
            <v-btn
              color="success"
              @click="preparedDataFiles"
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
import UploadImages from "vue-upload-drop-images";
import ShowsImages from "../../components/ShowsImages";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterCategory",
  props: {
    id: String,
  },
  components: {
    UploadImages,
    ShowsImages,
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
        size_id: null,
        name: "",
        description: "",
        stock: "",
        stock_min: "",
        status: true,
        unit_price: "",
        regular_price: "",
        colour_id: "",
        expired_date:"",
        images_id:[]
      },

      sizeList: [],
      loadingSize: false,

      listProducts: [],
      producList: [],
      loadingProduct: false,

      colourList: [],
      loadingColour: false,
      
      errorsBags: [],

      rules: {
        product_idRule: [(v) => !!v || "el campo es obligatorio"],
        nameRule: [(v) => !!v || "el campo es obligatorio"],
        stockRule: [(v) => !!v || "el campo es obligatorio"],
        stock_minRule: [(v) => !!v || "el campo es obligatorio"],
        unit_priceRule: [(v) => !!v || "el campo es obligatorio"],
        regular_priceRule: [(v) => !!v || "el campo es obligatorio"],
      },
      
      displayed: true,
      selectedFile: [],
      
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

      sizeData: "referenceList/getReferenceListByReferenceSlugData",
      coloursData: "referenceList/getReferenceListByReferenceSlugData",
      productData: "product/getProductData",
      
      getProductsByIdCommerce: "commerce/getProductsByIdCommerce",
      createImage: "image/createImage",
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
          _this.loadSize(element.type_size_slug);
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
       
      this.loadColour();
      this.loadCommerces();
        
      if (this.id) {
        this.ProductBatches(this.id).then((result) => {

          this.commerce_id = result.commerce_id;
          this.form = Object.assign({}, result);
          
          this.ProductsByIdCommerce(); 

          this.loadSize(result.type_size_slug);     

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
            this.textSnackBar = "Guardado existosamente!";
            // this.$router.push("/products/categories");
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateProductBatches(payload)
        .then((result) => {
          if (result) {
            this.form = Object.assign({}, result);
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
    
    onFileSelected(event) {
      this.selectedFile = event;
    },
    
    preparedDataFiles() {
      
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        if (this.selectedFile.length) {
          const payload = new FormData();
          this.selectedFile.forEach((e) => {
            payload.append("images[]", e);
          });
          this.createImagenes(payload);
        }else{
          this.save();
        }
      }
    },
               
    createImagenes(payload) {
      this.createImage(payload)
        .then((result) => {
          if (result) {

            result.forEach((e) => {
              this.form.images_id.push(e.id);
            });

            this.selectedFile = [];
             
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
            
            this.save();


            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    deleteImagen(item) { 
      this.form.imagenes.forEach((e) => {
        if(e.id == item){
          e.delete = !e.delete;
        }
      });
    },


    loadCommerces() {
      const rows = [];
      this.commerces = [];
      this.loadingCommerces = true;
      this.commerceData()
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
    loadSize(referenceId) {
      const rows = [];
      this.loadingSize = true;
      this.sizeData(referenceId)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.sizeList = rows;
            });
          }
          this.loadingSize = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
    },
    loadColour() {
      const rows = [];
      this.loadingColour = true;
      const referenceId = 'COLOURS';
      this.coloursData(referenceId)
        .then((result) => {
          console.log(result);
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.colourList = rows;
            });
          }
          this.loadingColour = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
    },
    
  },
};
</script>