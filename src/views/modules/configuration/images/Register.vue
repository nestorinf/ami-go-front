<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Imagenes
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se suben las Imagenes
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <UploadImages v-if="displayed" :max="1" @change="onFileSelected" />
          </v-col>
        </v-row>
        <br />
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
          to="/configuration/images"
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
import UploadImages from "vue-upload-drop-images";
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterImageType",
  props: {
    id: String
  },
  components: {
    UploadImages,
    SnackBar
  },

  data() {
    return {
      displayed: true,
      selectedFile: null,
      textSnackBar: "",
      valid: true,
      form: {
        id: "",
        name: "",
        description: ""
      },

      rules: {
        nameRule: [(v) => !!v || "es campo es obligatorio"],
        descriptionRule: [(v) => !!v || "este campo es obligatorio"]
      }
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getImageTypes() {
      return this.$store.state.imageType.imageTypes;
    }
  },
  methods: {
    ...mapActions({
      createImage: "image/createImage",
      imageType: "imageType/getImageTypeById",
      updateImage: "image/updateImage"
    }),
    save() {
      const payload = new FormData();
      payload.append("image", this.selectedFile);

      if (this.id) {
        this.update(payload);
      } else {
        this.create(payload);
      }
    },
    setData() {
      if (this.id) {
        this.imageType(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createImage(payload)
        .then((result) => {
          if (result) {
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
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

    update(payload) {
      this.updateImage(payload)
        .then((result) => {
          if (result) {
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
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
      this.selectedFile = event[0];
    }
  }
};
</script>
