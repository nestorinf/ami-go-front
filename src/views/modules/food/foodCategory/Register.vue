<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Categoria de Comida
      </h3>
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
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los categorias de Comida
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingRestaurant"
              label="Restaurante *"
              :items="restaurantLists"
              v-model="form.restaurant_id"
              filled
              required
              :rules="rules.restaurantRule"
              background-color="transparent"
              :error-messages="errorsBags.restaurant_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombre *"
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
              label="Descripción *"
              filled
              required
              :rules="rules.descriptionRule"
              background-color="transparent"
              :error-messages="errorsBags.description"
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
          to="/food/food-category"
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
  name: "RegisterFoodCategory",
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
      loadingRestaurant: true,
      errorsBags: [],
      restaurantLists: [],
      form: {
        id: "",
        name: "",
        description: "",
      },
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        descriptionRule: [(v) => !!v || "este campo es obligatorio"],
        restaurantRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getFoodCategorys() {
      return this.$store.state.foodCategory.foodCategorys;
    },
  },
  methods: {
    ...mapActions({
      createFoodCategory: "foodCategory/createFoodCategory",
      foodCategory: "foodCategory/getFoodCategoryById",
      updateFoodCategory: "foodCategory/updateFoodCategory",
      restaurants: "restaurant/getRestaurantsData",
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
      this.loadRestaurants();
    },
    loadRestaurants() {
      const rows = [];
      this.loadingRestaurant = true;
      this.restaurants()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.restaurantLists = rows;
            });
          }
          this.loadingRestaurant = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingPrloadingRestaurantviders = false;
        });
    },
    create(payload) {
      this.createFoodCategory(payload)
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
      this.updateFoodCategory(payload)
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