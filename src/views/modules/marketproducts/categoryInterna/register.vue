<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos las categorias
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :items="commerces"
              :loading="loadingCommerces"
              filled
              required
              v-model="form.commerce_id"
              label="Super mercado"
              :rules="rules.commerceRule"
              background-color="transparent"
            ></v-select>
          </v-col>

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

          <v-col cols="12">
            <ShowsImages
              :items="imagesList"
              v-if="id"
              @delete-imagen="deleteImagen"
            ></ShowsImages>
          </v-col>

          <v-col cols="12" lg="12">
            <UploadImages
              ref="VueUploadImageLogo"
              v-model="form.images"
              v-if="displayedLogo"
              @changed="onFileSelected"
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
              to="/marketproducts/categories_intern"
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
  name: "RegisterCategoryIntern",
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
      titleForm: "Categorias Internas",
      valid: true,
      imagesList: [],
      selectedFile: [],
      displayedLogo: true,

      loadingCommerces: false,
      commerces: [],

      form: {
        id: "",
        name: "",
        interno: 1,
        description: "",
        parent_id: "",
        enabled: true,
        view_type: "MARKET",
        images: [],
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
      this.imagesList = [];
      if (this.id) {
        data.attachment.map((element) => {
          this.imagesList.push({
            id: element.id,
            imagen: element.url,
          });
        });
      }
      console.log(this.imagesList);
    },
  },

  methods: {
    ...mapActions({
      createCategory: "category/createCategory",
      category: "category/getCategoryByID",
      updateCategory: "category/updateCategory",

      commerceData: "commerce/getCommercesData",

      removeAttachment: "attachment/removeAttachment",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("name", this.form.name);
        formData.append("interno", this.form.interno);
        formData.append("commerce_id", this.form.commerce_id);
        formData.append("description", this.form.description);
        formData.append("parent_id", this.form.parent_id);
        formData.append("enabled", this.form.enabled);
        formData.append("view_type", this.form.view_type);

        this.selectedFile.forEach((e) => {
          formData.append("images[]", e);
        });

        if (this.id) {
          formData.append("id", this.id);
          formData.append("_method", "PUT");
          this.update(formData, this.id);
        } else {
          this.create(formData);
        }
      }
    },
    setData() {
      this.loadCommerces();
      if (this.id) {
        this.category(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            description: result.description,
            parent_id: result.parent_id,
            commerce_id: result.commerce_id,
            enabled: result.enabled,
            view_type: result.view_type,
            interno: result.interno,
            images: [],
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

    loadCommerces() {
      const rows = [];
      this.loadingCommerces = true;
      this.commerceData(1)
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
  },
};
</script>