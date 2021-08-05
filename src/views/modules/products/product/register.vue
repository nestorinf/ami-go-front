<template>
<div>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Producto
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los productos
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              @change="loadCategoriesIntern"
              :items="commerces"
              :loading="loadingCommerces"
              filled
              required
              v-model="form.commerce_id"
              label="Comercio"
              :rules="rules.commerceRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCategories"
              :items="categories"
              required
              :rules="rules.categoryRule"
              v-model="form.category_id"
              filled
              label="Categoria Producto"
              background-color="transparent"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripcion"
              filled
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12">
            <v-textarea
              v-model="form.conditions"
              label="Condiciones"
              auto-grow
              filled
              required
              background-color="transparent"
              rows="2"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.price"
              type="number"
              label="Precio"
              prefix="$"
              required
              :rules="rules.priceRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.weight"
              label="Peso"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :items="uom"
              v-model="form.uom_id"
              filled
              required
              :rules="rules.uomRule"
              :loading="loadingUom"
              label="Unidad de Medida"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingProviders"
              :items="providers"
              v-model="form.provider_id"
              filled
              label="Proveedor"
              background-color="transparent"
            ></v-select>
          </v-col>
          
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCategoriesIntern"
              :items="categoriesIntern"
              required
              :rules="rules.categoryInternRule"
              v-model="form.category_intern_ids"
              filled
              multiple
              chips
              label="Categorias Internas Producto"
              background-color="transparent"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="3">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" lg="3">
            <v-checkbox
              v-model="form.on_stock"
              required
              label="En Stock"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-btn
          color="success"
          @click="save"
          :disabled="!valid"
          submit
          class="text-capitalize mr-2"
          >Guardar</v-btn
        >
        <v-btn color="black" class="text-capitalize" to="/products/product" dark
          >Cancelar</v-btn
        >
      </v-form>
    </v-card-text>

    <v-card class="mb-7">  
      <v-form ref="form_detail" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Lote del Producto
        </h3>
      </v-card-text>

      <v-card-text> 
          <v-row>
            
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description_batches"
              label="Descripción del Lote"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" lg="6">
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
          </v-row> 
      </v-card-text>
    <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
      </v-card-text>
          <v-row  class="px-7 pt-7">
            <v-col cols="12" lg="3">
              <v-text-field
                v-model="form_detail.stock"
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
            <v-col cols="12" lg="4">
              <v-select
                :loading="loadingColour"
                label="Color"
                :items="colourList"
                v-model="form_detail.colour_id"
                filled
                :rules="rules.colour_idRule"
                background-color="transparent"
                :error-messages="errorsBags.colour_id"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="4">
              <v-select
                :loading="loadingSize"
                label="Talla"
                :items="sizeList"
                v-model="form_detail.size_id"
                filled
                :rules="rules.size_idRule"
                background-color="transparent"
                :error-messages="errorsBags.size_id"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="1" class="align-center d-flex">
              <v-btn
                color="success"
                @click="AddProductDetail"
                :disabled="!valid"
                submit
                class="text-capitalize mr-2"
                >
                  <v-icon small>mdi-plus</v-icon>
                </v-btn> 
            </v-col>
          </v-row>
          <v-row class="px-7">
      <v-col cols="12" lg="12" sm="12">

        
        <DataTable
          :headers="headers"
          :items="listDetail" 
          :loading="true"
          @remove-button="acceptRemoveProductBatches"
        ></DataTable>
      </v-col></v-row>
    </v-card>

    </v-form>
    
    </v-card>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
  
      
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
    </div>
</template>

<script>
import DataTable from "./components/DataTable";
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import DialogConfirm from "../../components/DialogConfirm";
export default {
  name: "RegisterProduct",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    DataTable,
    DialogConfirm,
  },
  data: () => ({
    
      menu2: false,
    messageDialog: "",
    textSnackBar: "",
    titleForm: "Detalles",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Stock",
        value: "stock",
      },
      {
        text: "Color",
        value: "colour",
      },
      {
        text: "Talla",
        value: "size",
      },
    ],
    items: [],
    idDelete: "",
    idDeleteType: "",
    
    sizeList: [],
    loadingSize: false,
    colourList: [],
    loadingColour: false,

    valid: true,
    commerces: [],
    categories: [],
    categoriesIntern: [],
    providers: [],
    uom: [],
    loadingCommerces: false,
    loadingCategories: false,
    loadingCategoriesIntern: false,
    loadingProviders: false,
    loadingUom: false,

    form: {
      name: "",
      sku: "",
      enabled: 1 || 0,
      on_stock: 1 || 0,
      owns_batch: 1,
      description: "",
      conditions: "",
      commerce_id: "",
      price: "",
      weight: "",
      uom_id: "",
      category_id: "",
      provider_id: "",
      category_intern_ids: [],
      product_batches_detail: [],
      description_batches: "",
      expired_date: "",
      product_classification_id: "",
    },

      errorsBags: [],
    form_detail: {
      stock: '',
      size_id: '',
      colour_id: ''
    },

    rules: {
      commerceRule: [(v) => !!v || "este campo es obligatorio"],
      categoryRule: [(v) => !!v || "este campo es obligatorio"],
      nameRule: [(v) => !!v || "este campo es obligatorio"],
      priceRule: [(v) => !!v || "este campo es obligatorio"],
      uomRule: [(v) => !!v || "este campo es obligatorio"],
      categoryInternRule: [(v) => !!v || "este campo es obligatorio"],
    },
  }),

  mounted() {
    this.setData();
  },
  methods: {
    ...mapActions({
      removeProductBatches: "productBatchesDetail/removeProductsBatchesDetail",
      createProduct: "product/createProduct",
      updateProduct: "product/updateProduct",
      commerceData: "commerce/getCommercesData",
      categoryData: "category/getCategoriesData",
      getCategoriesDataInternCommerce: "category/getCategoriesDataInternCommerce",
      providerData: "provider/getProvidersData",
      productById: "product/getProductById",
      uomData: "referenceList/getReferenceListByReferenceSlugData",
      sizeData: "referenceList/getReferenceListByReferenceSlugData",
      coloursData: "referenceList/getReferenceListByReferenceSlugData",
    }),
    AddProductDetail(){
      this.form.product_batches_detail.push({
      stock : this.form_detail.stock,
      size_id: this.form_detail.size_id,
      colour_id: this.form_detail.colour_id
      });      
      // this.$refs.form_detail.reset();
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

    create(payload) {
      this.createProduct(payload)
        .then((result) => {
          if (result) { 
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = err.response.data.errors;
        });
    },

    update(payload) {
      this.updateProduct(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";

            const parseData = {
              id: result.id,
              name: result.name,
              description: result.description,
              conditions: result.conditions,
              price: result.price,
              weight: result.weight,
              uom_id: result.uom.id,
              category_id: result.category.id,
              provider_id: '',
              commerce_id: result.commerce.id,
              enabled: result.enabled,
              on_stock: result.on_stock,
              category_intern_ids: result.category_intern_ids,
              product_batches_detail: result.product_batches_detail,
              product_batche_id: result.product_batche_id,
              description_batches: result.description_batches,
              expired_date: result.expired_date,
              product_classification_id: result.product_classification_id,
            };


            this.form = Object.assign({}, parseData);
          
            // this.$router.push("/products/categories");
          }
        })
        .catch((err) => {
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = err.response.data.errors;
        });
    },

    setData() {
      
      // load categories
      this.loadCategories();

      // load commerces
      this.loadCommerces();

      // load providers
      this.loadProviders();

      // load unit of measures (uom)
      this.loadUom();

      this.loadColour();
      this.loadSize('SIZE_PRODUCT');


      // get data by id

      if (this.id) {
        this.productById(this.id).then((result) => {
          console.log(result);

          const parseData = {
            id: result.id,
            name: result.name,
            description: result.description,
            conditions: result.conditions,
            price: result.price,
            weight: result.weight,
            uom_id: result.uom.id,
            category_id: result.category.id,
            provider_id: '',
            commerce_id: result.commerce.id,
            enabled: result.enabled,
            on_stock: result.on_stock,
            category_intern_ids: result.category_intern_ids,
            product_batches_detail: result.product_batches_detail,
            product_batche_id: result.product_batche_id,
            description_batches: result.description_batches,
            expired_date: result.expired_date,
            product_classification_id: result.product_classification_id,
          };


          this.form = Object.assign({}, parseData);
          
          this.loadCategoriesIntern();

        });
        
      }
    },

    loadCommerces() {
      const rows = [];
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

    loadCategories() {
      const rows = [];
      this.loadingCategories = true;
      this.categoryData('COMMERCE')
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.categories = rows;
            });
          }
          this.loadingCategories = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCategories = false;
        });
    },

    loadCategoriesIntern() {
      const rows = [];
      this.loadingCategoriesIntern = true;
      this.getCategoriesDataInternCommerce(this.form.commerce_id)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.categoriesIntern = rows;
            });
          }
          this.loadingCategoriesIntern = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCategories = false;
        });
    },

    loadProviders() {
      const rows = [];
      this.loadingProviders = true;
      this.providerData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.providers = rows;
            });
          }
          this.loadingProviders = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingProviders = false;
        });
    },

    loadUom() {
      const rows = [];
      this.loadingUom = true;
      const referenceId = "UNIT_MEASURE";
      this.uomData(referenceId)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.uom = rows;
            });
          }
          this.loadingUom = false;
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

    acceptRemoveProductBatches(item) {
      if (item.id!=null) {
        this.idDelete = item.id; 
        this.idDeleteType = 'id'; 
      }else{
        this.idDelete = item.index;
        this.idDeleteType = 'index';
      }
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    
    removeButton() {      
        
        if (this.idDeleteType== 'id') {
          this.removeButtonId();
        }else{
          this.removeButtonIndex();
        }



    },

    removeButtonId() {      
       this.removeProductBatches(this.idDelete)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";

            const idDelete = this.idDelete ;
            const detalle = this.form.product_batches_detail.findIndex((x) => x.id === idDelete);
            this.form.product_batches_detail.splice(detalle, 1);

          }
        }).catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });

      this.$refs.DialogConfirm.changeStateDialog(false); 
    },
    
    removeButtonIndex() {      

      this.form.product_batches_detail.splice(this.idDelete, 1);

      this.$refs.DialogConfirm.changeStateDialog(false); 

    },
  },
  computed: {
    listDetail(){
      var data = this.form.product_batches_detail;
      var colourList = this.colourList;
      var sizeList = this.sizeList;
      const rows = [];      
      if(data!=undefined && data.length > 0){
        data.map((element, index) => { 
          const color = colourList.findIndex((x) => x.value === element.colour_id); 
          const talla = sizeList.findIndex((x) => x.value === element.size_id);          
          if (element) {
            rows.push({
              index: index, 
              id: element.id??null, 
              stock: element.stock, 
              colour: color!=-1?colourList[color]['text']:'N/A',
              size: talla!=-1?sizeList[talla]['text']:'N/A',
            });
          }
        });
    }
    
    return rows;

    }
  },
};
</script>