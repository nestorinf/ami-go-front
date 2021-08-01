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
          <v-col cols="12" lg="12">
            <UploadImages v-if="displayed" :max="50" @change="onFileSelected" />
          </v-col>
           
          <ShowsImages :items="form.imagenes" v-if="id" @delete-imagen="deleteImagen"></ShowsImages>
        
          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
              :error-messages="errorsBags.enabled"
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
          to="/marketproducts/categories"
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
import UploadImages from "vue-upload-drop-images";
import ShowsImages from "../../components/ShowsImages";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterCategory",
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
      displayed: true,
      selectedFile: [],
      textSnackBar: "",
      valid: true,
      form: {
        name: "",
        description: "",
        parent_id: "",
        enabled:false,
        saved_imagen:true,
        view_type:'MARKET'
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
        if (this.selectedFile.length) {
          const payload = new FormData();
          payload.append("name", this.form.name);
          payload.append("description", this.form.description);
          payload.append("enabled", this.form.enabled);
          payload.append("saved_imagen", this.form.saved_imagen);
          payload.append("view_type", this.form.view_type);
          this.selectedFile.forEach((e) => {
            payload.append("images[]", e);
          });
          if (this.id) {
            payload.append("id", this.id);
            this.update(payload);
          } else {
            this.create(payload);
          }
        }else{
          const payload = this.form;
          if (this.id) {
            this.update(payload);
          } else {
            this.create(payload);
          }
        }
      }
    },
    setData() {
      this.loadingCategories = true;
      const rows = [];
        this.getCategoriesData('MARKET').then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.categoriesList = rows;
        });
          this.loadingCategories = false;
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
      this.updateCategory(payload)
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
    onFileSelected(event) {
      this.selectedFile = event;
    },
    deleteImagen(item) { 
      this.form.imagenes.forEach((e) => {
        if(e.id == item){
          e.delete = !e.delete;
        }
      });
      this.form.saved_imagen = !this.form.saved_imagen;
    },
  },
};
</script>