<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <span
        class="text-h5 ml-2 blue-grey--text text--darken-4 font-weight-regular"
      >
        Categoria
      </span>

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
        En este formulario se registran todas las categorias de productos para
        un comercio.
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombre *"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.description"
              label="Descripción *"
              filled
              required
              :rules="rules.descriptionRule"
              background-color="transparent"
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
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12">
            <ShowsImages
              :items="imagesList"
              v-if="id"
              @delete-imagen="deleteImagen"
            ></ShowsImages>
          </v-col>
          <v-col cols="12" lg="12" v-if="id && imagesList.length > 0">
            <v-alert dense outlined type="success"
              >Solo se permite registrar una imagen</v-alert
            >
          </v-col>
          <v-col
            cols="12"
            lg="12"
            class="mb-10"
            v-else-if="id && imagesList.length == 0"
          >
            <v-alert dense outlined type="info"
              >El campo de imagen es obligatorio</v-alert
            >
            <UploadImages v-if="displayed" :max="1" @changed="onFileSelected" />
          </v-col>
          <v-col cols="12" lg="12" class="mb-10" v-else>
            <UploadImages v-if="displayed" :max="1" @changed="onFileSelected" />
          </v-col>

          <v-col cols="12" lg="12">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
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
import { mapActions, mapGetters } from "vuex";
import UploadImages from "vue-upload-drop-images";
import ShowsImages from "../../components/ShowsImages";
import SnackBar from "@/views/modules/components/SnackBar";

import { handleMessage } from "@/utils";
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
      imagesList: [],
      valid: true,
      form: {
        name: "",
        description: "",
        parent_id: "",
        interno: 0,
        enabled: true,
        saved_imagen: true,
        view_type: "COMMERCE",
      },
      loadingCategories: false,
      categoriesList: [],
      errorsBags: [],

      rules: {
        nameRule: [(v) => !!v || "el nombre es obligatorio"],
        descriptionRule: [(v) => !!v || "la descripcion es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ storeCategory: "category/getCategory" }),
    getCategories() {
      return this.$store.state.category.categories;
    },
  },
  watch: {
    storeCategory(data) {
      if (data.attachment.length > 0) {
        this.imagesList = Object.assign([], this.attachments(data.attachment));
      }
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
        const payload = new FormData();
        payload.append("name", this.form.name);
        payload.append("description", this.form.description);
        payload.append("enabled", this.form.enabled);
        payload.append("interno", this.form.interno);
        payload.append("parent_id", this.form.parent_id);
        payload.append("view_type", this.form.view_type);
        if (this.selectedFile.length) {
          this.selectedFile.forEach((e) => {
            payload.append("images[]", e);
          });
        }
        if (this.id) {
          if (this.selectedFile.length > 0 || this.imagesList.length > 0) {
            payload.append("_method", "PUT");
            payload.append("id", this.id);
            this.update(payload, this.id);
          }
        } else {
          if (this.selectedFile.length || this.id) {
            this.create(payload);
          }
        }
      }
    },
    setData() {
      this.LoadCategoriesData();
      if (this.id) {
        this.category(this.id).then((result) => {
          console.log(result);
          this.form = Object.assign({}, result);
          this.imagesList = this.attachments(result.attachment);
          // console.log(this.imagesList);
        });
      }
    },

    LoadCategoriesData() {
      this.loadingCategories = true;
      const rows = [];
      this.getCategoriesData("COMMERCE").then((result) => {
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
            this.form.enabled = true;
            handleMessage("Guardado existosamente!", 200, this);

            this.selectedFile = [];
            this.displayed = false;
            this.LoadCategoriesData();
            this.$nextTick(() => {
              this.displayed = true;
            });
            // this.$router.push("/products/categories");
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },

    update(payload, id) {
      this.updateCategory({ payload, id })
        .then((result) => {
          if (result) {
            this.form = Object.assign({}, result);
            handleMessage("Actualizado existosamente!", 200, this);

            this.selectedFile = [];
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

            // this.$router.push("/products/categories");
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },
    onFileSelected(event) {
      this.selectedFile = event;
    },

    deleteImagen(id) {
      const index = this.imagesList.findIndex((x) => x.id === id);
      const attachments = [...this.imagesList];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesList = attachments;
        }
      });
    },

    // deleteImagen(item) {
    //   this.form.imagenes.forEach((e) => {
    //     if (e.id == item) {
    //       e.delete = !e.delete;
    //     }
    //   });
    //   this.form.saved_imagen = !this.form.saved_imagen;
    // },
  },
};
</script>

<style>
div[aria-required="true"].v-input .v-label::after {
  content: " *";
  color: red;
}
</style>