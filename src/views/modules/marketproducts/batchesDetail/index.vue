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
          Añadir detalles al lote...
        </h3>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            
            <v-col cols="12" lg="4">
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
            <v-col cols="12" lg="4">
              <v-select
                :loading="loadingColour"
                label="Color"
                :items="colourList"
                v-model="form.colour_id"
                filled
                background-color="transparent"
                :error-messages="errorsBags.colour_id"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="4" v-if="formlote.type_size_slug">
              <v-select
                :loading="loadingSize"
                :label="titlesizeList"
                :items="sizeList"
                v-model="form.size_id"
                filled
                :rules="rules.size_idRule"
                background-color="transparent"
                :error-messages="errorsBags.size_id"
              ></v-select>
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
                >Añadir</v-btn
              >
              <v-btn
                color="black"
                class="text-capitalize"
                @click="$refs.form.reset()"
                dark
                >Limpiar</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
        
      </v-card-text>
    </v-card>
    <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }} {{formlote.name}}
        </h3>
      </v-card-text>

      <v-col cols="12" lg="12" sm="12">
        <DataTable
          :headers="headers"
          :items="items"
          :loading="true"
          @remove-button="acceptRemoveProductBatches"
        ></DataTable>
      </v-col>
    </v-card>
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import ButtonCrudTable from "./components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapActions,mapGetters } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";

export default {
  name: "ProductBatchesDetail",
  props: {
    id: String,
  },
  components: {
    DataTable,
    DialogConfirm,
    SnackBar,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Producto Super mercado",
        disabled: false,
        to: "#",
      },
      {
        text: "Lotes",
        disabled: true,
      },
    ],
    messageDialog: "",
    textSnackBar: "",
    ButtonCrud: ButtonCrudTable,
    titleForm: "Detalles del Lote:",
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
    formlote : {
    },
      valid: true, 
      form: {
        id: "",
        product_batche_id: "",
        stock: '',
        size_id: '',
        colour_id: ''
      },

      rules: {
        stockRule: [(v) => !!v || "el campo es obligatorio"],
      },
      errorsBags: [],

      
      titlesizeList: '',
      sizeList: [],
      loadingSize: false,
      colourList: [],
      loadingColour: false,

  }), 
  watch: {
    storeProductsBatches(data) {
      console.log('storeProductsBatches',data)
      this.items = [];
      if (data.length > 0) {
        this.items = data;
        console.log(this.items);
      }
    },
  },
  
  computed: {
    ...mapGetters({ storeProductsBatches: "productBatchesDetail/getProductsBatches" }),
  },

  methods: {  
    ...mapActions({
      getProductBatchesDetailData: "productBatchesDetail/getProductsBatchesDetailData",
      removeProductBatches: "productBatchesDetail/removeProductsBatchesDetail",

      ProductBatches: "productBatches/getProductBatchesById",
      sizeData: "referenceList/getReferenceListByReferenceSlugData",
      coloursData: "referenceList/getReferenceListByReferenceSlugData",

      createProductBatchesDetail: "productBatchesDetail/createProductsBatchesDetail",
    }),
    acceptRemoveProductBatches(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {      
       this.removeProductBatches(this.idDelete)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";
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
    setData() {
       
      this.loadColour();
        
      if (this.id) {
        this.ProductBatches(this.id).then((result) => {
          console.log('result',result)
          this.titlesizeList = result.name_size_slug;
          this.form.product_batche_id = result.id;
          this.formlote = Object.assign({}, result);
          
          this.ProductBatchesDetail(result.id);     
          this.loadSize(result.type_size_slug);     

        });

      }
    },    
    
    loadColour() {
    
      console.log('loadColour');
      console.log('loadColour');

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
    ProductBatchesDetail(id) {
      this.getProductBatchesDetailData(id);
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


    save() {  
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        this.create(payload);
      }
    },
    create(payload) {
      console.log('payload',payload),
      this.createProductBatchesDetail(payload)
        .then((result) => {
          if (result) {
            this.items.push(result);
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
  },
  mounted() {
    this.setData();
  },
};
</script>