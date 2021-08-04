<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Tipo de Restaurante
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los Tipos de Restaurante
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
              label="Descripcion"
              filled
              required
              :rules="rules.descriptionRule"
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>

          <v-col cols="8">
            <ShowsImages
              :items="imagesList"
              v-if="true"
              @delete-imagen="deleteImagen"
            ></ShowsImages>
          </v-col>

          <v-col cols="12" lg="12" class="mb-3">
            <UploadImages
              ref="VueUploadImages"
              v-model="form.images"
              v-if="displayed"
              :max="1"
              @changed="handleImages"
            />
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
          to="/restaurant/restaurant-type"
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
import ShowsImages from "../../components/ShowsImages";
import UploadImages from "vue-upload-drop-images";
import { mapActions, mapGetters } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterRestaurantType",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    UploadImages,
    ShowsImages,
  },
  computed: {
    ...mapGetters({ storeAttachement: "restaurantType/getRestaurantType" }),
    getRestaurantTypes() {
      return this.$store.state.restaurantType.restaurantTypes;
    },
  },
  data() {
    return {
      textSnackBar: "",
      valid: true,
      displayed: true,
      errorsBags: [],
      imagesList: [],
      form: {
        id: "",
        name: "",
        description: "",
        images: [],
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
  methods: {
    ...mapActions({
      createRestaurantType: "restaurantType/createRestaurantType",
      restaurantType: "restaurantType/getRestaurantTypeById",
      updateRestaurantType: "restaurantType/updateRestaurantType",
    }),
    save() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("id", this.id);
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);

        for (var i = 0; i < this.form.images.length; i++) {
          let file = this.form.images[i];
          formData.append("images[" + i + "]", file);
        }

        if (this.id) {
          formData.append("_method", "PUT");
          this.update(formData, this.id);
        } else {
          this.create(formData);
        }
      }
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
    setData() {
      if (this.id) {
        this.restaurantType(this.id).then((result) => {
          this.form = Object.assign({
            images: []
          }, result);
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
    handleImages(event) {
      this.form.images = event;
    },
    create(payload) {
      this.createRestaurantType(payload)
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
      this.updateRestaurantType(payload)
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
  watch: {
    storeAttachement(data) {
      if (data.attachment.length > 0) {
        this.imagesList = Object.assign([], this.attachments(data.attachment));
      }
    },
  },
};
</script>