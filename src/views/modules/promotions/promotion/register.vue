<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas las promociones
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          
          <v-col cols="12" lg="12" v-if="ExpirePromotion">
            <v-alert
              outlined
              type="warning"
              prominent
              border="left"
            >
              No se puede editar una promoción que ya ha expirado.
            </v-alert>
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre de la promoción"
              required
              filled
              :disabled="ExpirePromotion"
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripción de la promoción"
              filled
              :disabled="ExpirePromotion"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              label="Aplica para.."
              :items="types"
              v-model="form.type"
              filled
              required
              :disabled="ExpirePromotion"
              :rules="rules.typeRule"
              background-color="transparent"
              :error-messages="errorsBags.type"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="date"
              v-model="form.expire_date"
              label="Fecha de Expiración"
              filled
              :disabled="ExpirePromotion"
              background-color="transparent"
              :error-messages="errorsBags.expire_date"
            ></v-text-field>
          </v-col>
         </v-row>

        <v-row>        
          <v-col cols="12" lg="6">            
            <v-select
              label="Tipo de Descuento"
              :items="types_promotion"
              v-model="form.type_descuent"
              filled
              required
              :disabled="ExpirePromotion"
              :rules="rules.type_descuentRule"
              background-color="transparent"
              :error-messages="errorsBags.type_descuent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.amount"
              label="Descuento"
              filled
              required
              :disabled="ExpirePromotion"
              :rules="rules.amountRule"
              background-color="transparent"
              :error-messages="errorsBags.amount"
            ></v-text-field>
          </v-col>
        </v-row>
         
        <v-row>          
           <v-col cols="12" lg="4">
            <v-checkbox
              v-model="form.is_cupon"
              required
              :disabled="ExpirePromotion"
              label="¿Acepta Cupones?"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" lg="4" v-if="form.is_cupon">
            <v-text-field
              v-model="form.code_cupon"
              label="Código del Cupon"
              filled
              required
              :disabled="ExpirePromotion"
              :rules="rules.code_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.code_cupon"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" v-if="form.is_cupon">
            <v-text-field
              type="number"
              v-model="form.total_cupon"
              label="Cantidad de Cupones"
              filled
              required
              :disabled="ExpirePromotion"
              :rules="rules.total_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.total_cupon"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>          
           <v-col cols="12" lg="4">
            <v-checkbox
              v-model="form.enabled"
              required
              :disabled="ExpirePromotion"
              label="¿Visible?"
            ></v-checkbox>
          </v-col>
        </v-row>
        
        <v-row v-if="!ExpirePromotion">
          <v-col cols="12" lg="12">
            <UploadImages v-if="displayed" :max="50" @change="onFileSelected" />
          </v-col>
        </v-row>
        
        <ShowsImages :items="form.imagenes" :disabled="ExpirePromotion" v-if="id" @delete-imagen="deleteImagen"></ShowsImages>
        
        <v-row class="pt-10">
          <v-col cols="12" lg="12">
            <v-btn
              v-if="!ExpirePromotion"
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
              to="/promotions/promotion"
              dark
              >Cancelar</v-btn
            >
          </v-col>
        </v-row>
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
import { mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";
import ShowsImages from "../../components/ShowsImages";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterPromotion",
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
      date_expired : false,
      headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Tipo",
        align: "start",
        sortable: false,
        value: "type",
      },
    ],

      textSnackBar: "",
      titleForm: "Promoción",
      valid: true,
      form: {
        id: "",
        name: "",
        description: "",
        expire_date: "",
        type: "",
        is_cupon: false,
        code_cupon: "",
        total_cupon: "",
        enabled: true,
        type_descuent: "",
        amount: "",
        images_id: []
      },
      types: [{
          value: 'all',
          text: 'Todos',
        },{
          value: 'commerce',
          text: 'Comercios',
        },{
          value: 'restaurant',
          text: 'Restaurantes',
      }],
      types_promotion: [{
          value: 'porc',
          text: 'Procentaje',
        },{
          value: 'total',
          text: 'Deducible del total',
        }],
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        typeRule: [(v) => !!v || "este campo es obligatorio"],
        code_cuponRule: [(v) => !!v || "este campo es obligatorio"],
        total_cuponRule: [(v) => !!v || "este campo es obligatorio"],
        type_descuentRule: [(v) => !!v || "este campo es obligatorio"],
        amountRule: [(v) => !!v || "este campo es obligatorio"],
      },

      ListEntities : [],

      displayed: true, 
      selectedFile: [],
    };
  },

  mounted() {
    this.setData();
  },
  methods: {
    ...mapActions({
      createPromotion: "promotion/createPromotion",
      getPromotionById: "promotion/getPromotionById",
      updatePromotion: "promotion/updatePromotion",
      
      createImage: "image/createImage",
    }),
    
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

      if (this.id) {
        
        this.getPromotionById(this.id).then((result) => {
          console.log('result',result)
          this.date_expired = result.expired;
          // this.form = Object.assign({}, result);
          this.form = {
            id: result.id,
            name: result.name,
            type: result.type,
            expire_date: result.expire_date,
            is_cupon: result.is_cupon,
            code_cupon: result.code_cupon,
            total_cupon: result.total_cupon,
            description : result.description,
            enabled: result.enabled,
            type_descuent: result.type_descuent,
            amount: result.amount,
            images_id: result.images_id,
            imagenes: result.imagenes,
          };
        });
      }
    },


    create(payload) {
      this.createPromotion(payload)
        .then((result) => {
          console.log(result);
          if (result) {
            // this.form = {};
            // this.$refs.form.reset();
            // this.form.is_cupon = false;
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
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updatePromotion(payload)
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
    }
  },
  computed: {
    ExpirePromotion(){
      var date_expired = this.date_expired;
      return date_expired;
    }
  },
  
};
</script>