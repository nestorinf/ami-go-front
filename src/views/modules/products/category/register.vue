<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Categoria
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos las categorias
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
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
              :rules="rules.descriptionRule"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCategories"
              label="Categoría Padre"
              :items="categoriesList"
              v-model="form.parent_id"
              filled
              background-color="transparent"
              :error-messages="errorsBags.parent_id"
            ></v-select>
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
          to="/products/categories"
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
  name: "RegisterCategory",
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
      form: {
        name: "",
        description: "",
        parent_id: ""
      },
      loadingCategories: false,
      categoriesList: [],
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "el nombre es obligatorio"],
        descriptionRule: [(v) => !!v || "el nombre es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getCategories() {
      return this.$store.state.category.categories;
    },
  },
  methods: {
    ...mapActions({
      createCategory: "category/createCategory",
      category: "category/getCategoryByID",
      updateCategory: "category/updateCategory",
      getCategoriesData: "category/getCategoriesData",
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
      this.loadingCategories = true;
      const rows = [];
        this.getCategoriesData().then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.categoriesList = rows;
          this.loadingCategories = false;
        });
      });
      if (this.id) {
        this.category(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createCategory(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
            this.$router.push("/products/categories");
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
      this.updateCategory(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
            this.$router.push("/products/categories");
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