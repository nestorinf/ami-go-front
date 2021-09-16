<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col>
        <v-alert
          border="left"
          colored-border
          type="error"
          dense
          dismissible
          width="xl"
          mode
        >
          Los Campos con <strong>*</strong> son obligatorios
        </v-alert>
      </v-col>
      <v-card-text>
        <h4 class="font-weight-light">Nueva Característica</h4>

        <v-row>
          <v-col cols="4" lg="4">
            <v-select
              @input="searchTypeFeature()"
              :loading="loadingTypeFeature"
              label="Tipo de característica *"
              :items="TypeFeaturesList"
              v-model="form.feature_type_id"
              filled
              required
              background-color="transparent"
              :rules="rules.typeRule"
              :error-messages="errorsBags.feature_type_id"
            ></v-select>
          </v-col>
          <v-col cols="4" lg="4">
            <v-text-field
              v-model="form.name"
              label="Nombre *"
              filled
              background-color="transparent"
              :rules="rules.nameRule"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="4"
            lg="4"
            v-if="TypeFeatureSelected && TypeFeatureSelected.price"
          >
            <v-text-field
              v-model="form.price"
              label="Precio"
              required
              number
              filled
              background-color="transparent"
              :rules="rules.priceRule"
              :error-messages="errorsBags.price"
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
        <v-btn color="black" class="text-capitalize" to="/food/food" dark
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
      TypeFeatureSelected: "",
      errorsBags: [],
      form: {
        id: "",
        name: "",
        food_id: "",
        feature_type_id: "",
        price: "",
        enabled: true,
      },
      rules: {
        typeRule: [(v) => !!v || "este campo es obligatorio"],
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        priceRule: [(v) => !!v || "este campo es obligatorio"],
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
      getTypeFeatureData: "foodTypeFeature/getFoodTypeFeatureData",
      foodTypeFeature: "foodTypeFeature/getFoodTypeFeatureById",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        this.create(payload);
      }
    },
    setData() {
      this.loadingTypeFeature = true;
      const TypeFeatures = [];
      this.getTypeFeatureData().then((result) => {
        result.map((element) => {
          TypeFeatures.push({
            value: element.id,
            text: element.value,
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
      payload["food_id"] = this.idfood;
      this.createFoodFeature(payload)
        .then((result) => {
          if (result) {
            this.$emit("add-new-items", result);
            this.form = {};
            this.TypeFeatureSelected = "";
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

    searchTypeFeature() {
      if (this.form.feature_type_id) {
        this.foodTypeFeature(this.form.feature_type_id).then((result) => {
          this.TypeFeatureSelected = Object.assign({}, result);
        });
      }
    },
  },
};
</script>
