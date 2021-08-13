<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas las categoria Producto Super mercado
        </h6>
      </v-card-text>
      <v-card-text>
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

          
          <v-col cols="12">
            <ShowsImages
              :items="imagesListLogo"
              v-if="true"
              @delete-imagen="deleteImagenLogo"
            ></ShowsImages>
          </v-col>

          <v-col cols="12" lg="12">
            <UploadImages
              ref="VueUploadImageLogo"
              v-model="form.images"
              v-if="displayedLogo"
              @change="handleImageLogo"
            />
          </v-col>
           
          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
              :error-messages="errorsBags.enabled"
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
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
          </v-col>
        </v-row>
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
import { mapActions, mapGetters } from "vuex";
import ShowsImages from "../../components/ShowsImages";
import UploadImages from "vue-upload-drop-images";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterCommerce",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    UploadImages,
    ShowsImages,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Categoria Producto Super mercado",
      valid: true,
      loadingCommerceType: false,
      commerceTypeList: [],
      imagesListLogo: [],
      displayedLogo: true,
      
      loadingCategories: false,
      categoriesList: [],

      form: {
        id:"",
        name: "",
        description: "",
        parent_id: "",
        enabled:false,
        view_type:'MARKET',
        logo: [],
      },
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
    ...mapGetters({
      storeCategory: "category/getCategory",
    }),
  },

  watch: {
    storeCategory(data) { 
      this.imagesListLogo = [];
      if (this.id) {
        data.attachment.map((element) => {
          this.imagesListLogo.push({
              id: element.id,
              imagen: element.url,
          });        
        }); 
      }
      console.log(this.imagesListLogo);
    },
  },

  methods: {
    ...mapActions({
        createCategory: "category/createCategory",
        category: "category/getCategoryByID",
        updateCategory: "category/updateCategory",
        getCategoriesData: "category/getCategoriesData",
        
        removeAttachment: "attachment/removeAttachment",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("id", this.id);

        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        formData.append("parent_id", this.form.parent_id);
        formData.append("enabled", this.form.enabled);
        formData.append("view_type", this.form.view_type);

        for (let i = 0; i < this.form.logo.length; i++) {
          let file = this.form.logo[i];
          formData.append("logo[" + i + "]", file);
        }  
        if (this.id) {
          formData.append("_method", "PUT");
          this.update(formData, this.id);
        } else {
          this.create(formData);
        }
      }
    },
    setData() { 
      this.loadCategories(); 
      if (this.id) { 
        this.category(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            description: result.description,
            parent_id: result.parent_id,
            enabled: result.enabled,
            view_type: result.view_type,
            logo: [],
          };
        });
      }
    },

    attachments(attachmentData) {
      const attachmentsRows = [];
      if (this.id) {
        attachmentData.map((element) => {
          if (element) {
            attachmentsRows.push({
              id: element.id,
              imagen: element.url,
            });
          }
        });
      }
 
      return attachmentsRows;
    },

    create(payload) {
      this.createCategory(payload)
        .then((result) => {
          if (result) { 
            this.$refs.form.reset();
            this.form.parent_id = "";
            this.$refs.VueUploadImageLogo.Imgs = [];
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload, id) {
      this.updateCategory({ payload, id })
        .then((result) => {
          if (result) {
            this.$refs.VueUploadImageLogo.Imgs = [];
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    handleImageLogo(event) {
      this.form.logo = event;
    },

    deleteImagenLogo(id) {
      const index = this.imagesListLogo.findIndex((x) => x.id === id);
      const attachments = [...this.imagesListLogo];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesListLogo = attachments;
        }
      });
    },
    loadCategories() {
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
    },
  },
};
</script>