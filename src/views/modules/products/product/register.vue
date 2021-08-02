<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Producto
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los productos
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              @change="loadCategoriesIntern"
              :items="commerces"
              :loading="loadingCommerces"
              filled
              required
              v-model="form.commerce_id"
              label="Comercio"
              :rules="rules.commerceRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCategories"
              :items="categories"
              required
              :rules="rules.categoryRule"
              v-model="form.category_id"
              filled
              label="Categoria Producto"
              background-color="transparent"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Descripcion"
              filled
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12">
            <v-textarea
              v-model="form.conditions"
              label="Condiciones"
              auto-grow
              filled
              required
              background-color="transparent"
              rows="2"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.price"
              type="number"
              label="Precio"
              prefix="$"
              required
              :rules="rules.priceRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              type="number"
              v-model="form.weight"
              label="Peso"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :items="uom"
              v-model="form.uom_id"
              filled
              required
              :rules="rules.uomRule"
              :loading="loadingUom"
              label="Unidad de Medida"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingProviders"
              :items="providers"
              v-model="form.provider_id"
              filled
              label="Proveedor"
              background-color="transparent"
            ></v-select>
          </v-col>
          
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCategoriesIntern"
              :items="categoriesIntern"
              required
              :rules="rules.categoryInternRule"
              v-model="form.category_intern_ids"
              filled
              multiple
              chips
              label="Categorias Internas Producto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingTypeSizes"
              :items="TypeSizes"
              required
              v-model="form.type_size_slug"
              filled
              label="Tallas del Producto (Dejar en blanco sino aplica...)"
              background-color="transparent"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="3">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" lg="3">
            <v-checkbox
              v-model="form.on_stock"
              required
              label="En Stock"
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
        <v-btn color="black" class="text-capitalize" to="/products/product" dark
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
  name: "RegisterProduct",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },
  data: () => ({
    valid: true,
    commerces: [],
    categories: [],
    categoriesIntern: [],
    providers: [],
    TypeSizes: [],
    textSnackBar: "",
    uom: [],
    loadingCommerces: false,
    loadingCategories: false,
    loadingCategoriesIntern: false,
    loadingProviders: false,
    loadingUom: false,
    loadingTypeSizes: false,

    form: {
      name: "",
      sku: "",
      enabled: 1 || 0,
      on_stock: 1 || 0,
      owns_batch: 1,
      description: "",
      conditions: "",
      commerce_id: "",
      price: "",
      weight: "",
      uom_id: "",
      category_id: "",
      provider_id: "",
      category_intern_ids: [],
      type_size_slug: "",
    },

    rules: {
      commerceRule: [(v) => !!v || "este campo es obligatorio"],
      categoryRule: [(v) => !!v || "este campo es obligatorio"],
      nameRule: [(v) => !!v || "este campo es obligatorio"],
      priceRule: [(v) => !!v || "este campo es obligatorio"],
      uomRule: [(v) => !!v || "este campo es obligatorio"],
      categoryInternRule: [(v) => !!v || "este campo es obligatorio"],
    },
  }),

  mounted() {
    this.setData();
  },
  methods: {
    ...mapActions({
      createProduct: "product/createProduct",
      updateProduct: "product/updateProduct",
      commerceData: "commerce/getCommercesData",
      categoryData: "category/getCategoriesData",
      getCategoriesDataInternCommerce: "category/getCategoriesDataInternCommerce",
      providerData: "provider/getProvidersData",
      productById: "product/getProductById",
      uomData: "referenceList/getReferenceListByReferenceSlugData",
      getReferenceDataTypeSizes: "reference/getReferenceDataTypeSizes",
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

    create(payload) {
      this.createProduct(payload)
        .then((result) => {
          if (result) { 
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = err.response.data.errors;
        });
    },

    update(payload) {
      this.updateProduct(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
            // this.$router.push("/products/categories");
          }
        })
        .catch((err) => {
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = err.response.data.errors;
        });
    },

    setData() {
      // load categories
      this.loadCategories();

      // load commerces
      this.loadCommerces();

      // load providers
      this.loadProviders();

      // load unit of measures (uom)
      this.loadUom();

      // load types sizes
      this.loadTypeSizes();

      // get data by id

      if (this.id) {
        this.productById(this.id).then((result) => {
          const parseData = {
            id: result.id,
            name: result.name,
            description: result.description,
            conditions: result.conditions,
            price: result.price,
            weight: result.weight,
            uom_id: result.uom.id,
            category_id: result.category.id,
            provider_id: '',
            commerce_id: result.commerce.id,
            enabled: result.enabled,
            on_stock: result.on_stock,
            category_intern_ids: result.category_intern_ids,
            type_size_slug: result.type_size_slug,
          };

          this.form = Object.assign({}, parseData);
          
          this.loadCategoriesIntern();

        });
        
      }
    },

    loadCommerces() {
      const rows = [];
      this.loadingCommerces = true;
      this.commerceData(0)
        .then((result) => {
          if (result) {
            result.map((element) => {
              if (element.commerce_type !== "Restaurantes") {
                rows.push({
                  value: element.id,
                  text: element.name,
                });
              }
              this.commerces = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
    },

    loadCategories() {
      const rows = [];
      this.loadingCategories = true;
      this.categoryData('COMMERCE')
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.categories = rows;
            });
          }
          this.loadingCategories = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCategories = false;
        });
    },

    loadCategoriesIntern() {
      const rows = [];
      this.loadingCategoriesIntern = true;
      this.getCategoriesDataInternCommerce(this.form.commerce_id)
        .then((result) => {
          if (result) {
            console.log(result)
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.categoriesIntern = rows;
            });
          }
          this.loadingCategoriesIntern = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCategories = false;
        });
    },

    loadProviders() {
      const rows = [];
      this.loadingProviders = true;
      this.providerData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.providers = rows;
            });
          }
          this.loadingProviders = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingProviders = false;
        });
    },

    loadUom() {
      const rows = [];
      this.loadingUom = true;
      const referenceId = "UNIT_MEASURE";
      this.uomData(referenceId)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.uom = rows;
            });
          }
          this.loadingUom = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
    },

    loadTypeSizes() {
      const rows = [];
      this.loadingTypeSizes = true;
      this.getReferenceDataTypeSizes()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.slug,
                text: element.name,
              });
              this.TypeSizes = rows;
            });
          }
          this.loadingTypeSizes = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingTypeSizes = false;
        });
    },
  },
};
</script>