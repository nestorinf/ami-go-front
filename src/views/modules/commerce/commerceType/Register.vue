<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Categoria de Comercio
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos las Categorias de Comercio
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombre de la categoria"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
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
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <UploadImages v-if="displayed" :max="50" @change="onFileSelected" />
          </v-col>
        </v-row>
        <br /><br />
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
          to="/commerce/commerce-category"
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
import UploadImages from "vue-upload-drop-images";

export default {
  name: "RegisterCommerceType",
  props: {
    id: String
  },
  components: {
    SnackBar,
    UploadImages
  },

  data() {
    return {
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
      },
      displayed: true
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getCommerceTypes() {
      return this.$store.state.commerceType.commerceTypes;
    }
  },
  methods: {
    ...mapActions({
      createCommerceType: "commerceType/createCommerceType",
      commerceType: "commerceType/getCommerceTypeById",
      updateCommerceType: "commerceType/updateCommerceType"
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = new FormData();
        for (var key in this.form) {
          if (key != "id") {
            payload.append(key, this.form[key]);
          }
        }

        this.selectedFile.forEach((e) => {
          payload.append("images[]", e);
        });

        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      if (this.id) {
        this.commerceType(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createCommerceType(payload)
        .then((result) => {
          if (result) {
            this.displayed = false;
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
            this.$nextTick(() => {
              this.displayed = true;
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateCommerceType(payload)
        .then((result) => {
          if (result) {
            this.displayed = false;
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
            this.$nextTick(() => {
              this.displayed = true;
            });
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
    }
  }
};
</script>
