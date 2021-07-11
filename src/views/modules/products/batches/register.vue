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
              :loading="loadingProduct"
              label="Productos"
              :items="producList"
              v-model="form.product_id"
              filled
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
              filled
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
              filled
              required
              :rules="rules.regular_priceRule"
              background-color="transparent"
              :error-messages="errorsBags.regular_price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.expired_date"
              label="Fecha de expiración"
              type="date"
              filled
              required
              :rules="rules.expired_dateRule"
              background-color="transparent"
              :error-messages="errorsBags.expired_date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingColour"
              label="Color"
              :items="colourList"
              v-model="form.colour_id"
              filled
              :rules="rules.colour_idRule"
              background-color="transparent"
              :error-messages="errorsBags.colour_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.accept_size"
              required
              label="¿Es de Talla?"
              :error-messages="errorsBags.enabled"
            ></v-checkbox>
          </v-col>          
          <v-col cols="12" lg="12" v-if="form.accept_size">
            <v-select
              :loading="loadingSize"
              label="Talla"
              :items="sizeList"
              v-model="form.size_id"
              filled
              background-color="transparent"
              :rules="rules.size_idRule"
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
      textSnackBar: "",
      valid: true, 
      form_images: null,
      form: {
        product_id: "",
        accept_size: false,
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
        images_id:""
      },

      sizeList: [],
      loadingSize: false,

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
        colour_idRule: [(v) => !!v || "el campo es obligatorio"],
        expired_dateRule: [(v) => !!v || "el campo es obligatorio"],
        size_idRule: [(v) => !!v || "el campo es obligatorio"],
      },
      
      displayed: true,
      selectedFile: [],

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
      
      createImage: "image/createImage",

    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        console.log('payload',payload);
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      
      this.loadSize();
      this.loadColour();
      this.loadProducts();
        
      if (this.id) {
        this.ProductBatches(this.id).then((result) => {
          
          console.log('result',result);          
          this.form = Object.assign({}, result);
          console.log(this.form);          
        });
      }
    },

    create(payload) {
      this.createProductBatches(payload)
        .then((result) => {
          if (result) {
            console.log('result_reg',result)
            // this.form = {};
            // this.$refs.form.reset();
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
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
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
    
    onFileSelected(event) {
      console.log('event',event);
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
          this.createImagenes();
        }else{
          this.save();
        }
      }
    },
               
    createImagenes(payload) {
      this.createImage(payload)
        .then((result) => {
          if (result) {

            const images = [];
            result.forEach((e) => {
              images.push(e.id);
            });
            this.form['images_id'] = images;  
            this.save();

            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
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


    loadSize() {
      const rows = [];
      this.loadingSize = true;
      const referenceId = 'size_product';
      this.sizeData(referenceId)
        .then((result) => {
          console.log(result);
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
      const referenceId = 'colours_product';
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
    loadProducts() {
      const rows = [];
      this.loadingProduct = true;
      this.productData()
        .then((result) => {
          console.log(result);
          if (result) {
            result.map((element) => {
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