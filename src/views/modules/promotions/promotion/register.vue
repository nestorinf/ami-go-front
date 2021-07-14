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
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="form.name"
              label="Nombre de la promoción"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <v-text-field
              v-model="form.expire_date"
              label="Fecha de Expiración"
              filled
              background-color="transparent"
              :error-messages="errorsBags.expire_date"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <v-select
              label="Aplica para.."
              :items="types"
              v-model="form.type"
              filled
              required
              :rules="rules.typeRule"
              background-color="transparent"
              :error-messages="errorsBags.type"
            ></v-select>
          </v-col>
           <v-col cols="12" lg="3">
            <v-checkbox
              v-model="form.is_cupon"
              required
              label="¿Acepta Cupones?"
            ></v-checkbox>
          </v-col>
         </v-row>

        <v-row v-if="form.is_cupon">
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.code_cupon"
              label="Código del Cupon"
              filled
              required
              :rules="rules.code_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.code_cupon"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="number"
              v-model="form.total_cupon"
              label="Cantidad de Cupones"
              filled
              required
              :rules="rules.total_cuponRule"
              background-color="transparent"
              :error-messages="errorsBags.total_cupon"
            ></v-text-field>
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
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterPromotion",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {

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
        expire_date: "",
        type: "",
        is_cupon: false,
        code_cupon: "",
        total_cupon: ""
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
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        typeRule: [(v) => !!v || "este campo es obligatorio"],
        code_cuponRule: [(v) => !!v || "este campo es obligatorio"],
        total_cuponRule: [(v) => !!v || "este campo es obligatorio"],
      },

      ListEntities : []

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
          console.log(result)
          this.form = {
            id: result.id,
            name: result.name,
            type: result.type,
            expire_date: result.expire_date,
            is_cupon: result.is_cupon,
            code_cupon: result.code_cupon,
            total_cupon: result.total_cupon,
          };
        });
      }
    },


    create(payload) {
      this.createPromotion(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.form.is_cupon = false;
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
  },
  
};
</script>