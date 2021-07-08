<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Tipo de característica
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los Tipos de Características
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.value"
              label="Nombre"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.value"
            ></v-text-field>
          </v-col>
          <v-col cols="4" lg="4">
            <v-checkbox
              v-model="form.is_required"
              label="¿Es Requerido?"
              :error-messages="errorsBags.is_required"
            ></v-checkbox>
          </v-col>
          <v-col cols="4" lg="4">
            <v-checkbox
              v-model="form.is_multiple"
              label="¿Es Multiple?"
              :error-messages="errorsBags.is_multiple"
            ></v-checkbox>
          </v-col>
          <v-col cols="4" lg="4">
            <v-checkbox
              v-model="form.price"
              label="Acepta Precio?"
              :error-messages="errorsBags.price"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="form.enabled"
              label="Habilitado"
              :error-messages="errorsBags.price"
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/food/food-type-features"
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
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterFoodTypeFeature",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      errorsBags: [],
      form: {
        id: "",
        value: "",
        enabled: true,
        is_required: false,
        is_multiple: false,
        price: false,
      },
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getFoodTypeFeatures() {
      return this.$store.state.foodTypeFeature.foodTypeFeatures;
    },
  },
  methods: {
    ...mapActions({
      createFoodTypeFeature: "foodTypeFeature/createFoodTypeFeature",
      foodTypeFeature: "foodTypeFeature/getFoodTypeFeatureById",
      updateFoodTypeFeature: "foodTypeFeature/updateFoodTypeFeature",
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
        this.foodTypeFeature(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createFoodTypeFeature(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
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

    update(payload) {
      this.updateFoodTypeFeature(payload)
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
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
  },
};
</script>