<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Comida
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registra una comida de restaurante
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingRestaurant"
              label="Restaurante"
              :items="restaurantList"
              v-model="form.restaurant_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.restaurant_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingFood"
              label="Categoría"
              :items="foodCategoryList"
              v-model="form.food_category_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.food_category_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
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
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripción"
              filled
              :rules="rules.descriptionRule"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripción"
              filled
              :rules="rules.descriptionRule"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-textarea
              v-model="form.ingredients"
              label="Valor Ingredientes"
              auto-grow
              filled
              :rules="rules.ingredientsRule"
              background-color="transparent"
              :error-messages="errorsBags.ingredients"
              rows="4"
            ></v-textarea>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              label="Unidad de medida"
              :items="uomList"
              v-model="form.uom"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.uom"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.price"
              label="Precio"
              filled
              :rules="rules.priceRule"
              background-color="transparent"
              :error-messages="errorsBags.price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.tax"
              label="Taxes"
              filled
              :rules="rules.taxRule"
              background-color="transparent"
              :error-messages="errorsBags.tax"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.weight"
              label="Peso"
              filled
              :rules="rules.weightRule"
              background-color="transparent"
              :error-messages="errorsBags.weight"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.quantity"
              label="Cantidad"
              filled
              :rules="rules.quantityRule"
              background-color="transparent"
              :error-messages="errorsBags.quantity"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-checkbox
            v-model="form.is_group"
            required
            label="¿Es Grupo?"
              :rules="rules.is_groupRule"
            :error-messages="errorsBags.is_group"
          ></v-checkbox>
          </v-col>
          <v-col cols="6" lg="6">
            <v-checkbox
            v-model="form.is_extra"
            required
            label="¿Es Extra?"
              :rules="rules.is_extraRule"
            :error-messages="errorsBags.is_extra"
          ></v-checkbox>
          </v-col>
          <v-col cols="6" lg="6">
            <v-checkbox
            v-model="form.with_features"
            required
            label="¿Es Extra?"
              :rules="rules.with_featuresRule"
            :error-messages="errorsBags.with_features"
          ></v-checkbox>
          </v-col>
          <v-col cols="6" lg="6">
            <v-checkbox
            v-model="form.is_stock"
            required
            label="¿Es Extra?"
              :rules="rules.is_stockRule"
            :error-messages="errorsBags.is_stock"
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
          to="/food/food"
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
  name: "RegisterFood",
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
        name: "",
        description: "",
      },
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        descriptionRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getFoods() {
      return this.$store.state.foodCategory.foodCategorys;
    },
  },
  methods: {
    ...mapActions({
      createFood: "foodCategory/createFood",
      foodCategory: "foodCategory/getFoodById",
      updateFood: "foodCategory/updateFood",
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
        this.foodCategory(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createFood(payload)
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
      this.updateFood(payload)
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
