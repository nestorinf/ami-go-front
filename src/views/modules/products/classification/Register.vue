<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Clasificación
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos las Clasificaciones
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Clasificación"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingReferenceSize"
              label="Referencia"
              :items="referenceSize"
              v-model="form.reference_id"
              filled
              :rules="rules.referenceSizeRule"
              required
              background-color="transparent"
              :error-messages="errorsBags.reference_id"
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
          to="/products/classification"
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
      referenceSize: [],
      textSnackBar: "",
      valid: true,
      form: {
        name: "",
        reference_id: "",
      },
      loadingReferenceSize: false,
      categoriesList: [],
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "la clasificacion es obligatorio"],
        referenceSizeRule: [(v) => !!v || "la referencia es obligatorio"],
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
      createProductClassification: "productClassification/createClassification",
      getClassificationById: "productClassification/getClassificationById",
      updateProductClassification: "productClassification/updateClassification",

      getReferenceSize: "productClassification/getReferenceSize",
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
      this.loadingReferenceSize = true;

      this.getReferenceSize().then((result) => {
        const rows = [];
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
            slug: element.slug,
          });
        });
        this.referenceSize = rows;
        this.loadingReferenceSize = false;
      });

      if (this.id) {
        this.getClassificationById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createProductClassification(payload)
        .then((result) => {
          if (result) {
            // this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";

            this.selectedFile = [];
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

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
      this.updateProductClassification(payload)
        .then((result) => {
          if (result) {
            this.form = Object.assign({}, result);
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";

            this.selectedFile = [];
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

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
};
</script>