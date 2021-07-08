<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Añadir Tipo de característica a la comida
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se añaden tipo de característica a la comida
        </h6>
      </v-card-text>
      <v-card-text> 
        <v-row>
          <v-col cols="12" lg="12">
            <v-select
              @input="searchTypeFeature()"
              :loading="loadingTypeFeature"
              label="Clasificación de la características"
              :items="TypeFeaturesList"
              v-model="form.feature_type_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.feature_type_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              filled
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" v-if="TypeFeatureSelected && TypeFeatureSelected.price">
            <v-text-field
              v-model="form.price"
              label="Precio"
              required
              number
              filled
              background-color="transparent"
              :error-messages="errorsBags.price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="form.enabled"
              required
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
          @click="$router.go(-1)"
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
  name: "RegisterFoodFeature",
  props: {
    idfood: String,
    idfeature: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      loadingTypeFeature: false,
      TypeFeaturesList: [],
      TypeFeatureSelected: '',
      errorsBags: [],
      form: {
        id: "",
        name: "",
        food_id: "",
        feature_type_id: "",
        price: "",
        enabled: true,
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createFoodFeature: "foodFeature/createFoodFeature",
      getFoodFeatureById: "foodFeature/getFoodFeatureById",
      updateFoodFeature: "foodFeature/updateFoodFeature",      
      getTypeFeatureData: "foodTypeFeature/getFoodTypeFeatureData",
      foodTypeFeature: "foodTypeFeature/getFoodTypeFeatureById",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.idfeature) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      this.loadingTypeFeature = true;
      const TypeFeatures = [];
      this.getTypeFeatureData().then((result) => {
        result.map((element) => {
          TypeFeatures.push({
            value: element.id,
            text: element.value
          });
          this.TypeFeaturesList = TypeFeatures;
        });
        this.loadingTypeFeature = false;
      });
      if (this.idfeature) {
        this.getFoodFeatureById(this.idfeature).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      payload['food_id'] = this.idfood;
      this.createFoodFeature(payload)
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
      this.updateFoodFeature(payload)
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
    searchTypeFeature() {
      this.foodTypeFeature(this.form.feature_type_id).then((result) => {
        this.TypeFeatureSelected = Object.assign({}, result);
      });
    },
  },
  
};
</script>
