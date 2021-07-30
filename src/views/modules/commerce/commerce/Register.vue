<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas los comercios
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerceType"
              label="Tipo de Comercio"
              :items="commerceTypeList"
              v-model="form.commerce_type_id"
              filled
              required
              :rules="rules.commerceTypeRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del comercio"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="email"
              v-model="form.email"
              label="Email Comercio"
              required
              filled
              :rules="rules.emailRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.agent"
              label="Persona Contacto"
              filled
              required
              :rules="rules.agentRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.phone"
              label="Telefono Persona Contacto"
              filled
              required
              :rules="rules.phoneRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" lg="6">
            <label for="logo">Logo</label>
            <ShowsImages
              :items="imagesListLogo"
              v-if="true"
              @delete-imagen="deleteImagenLogo"
            ></ShowsImages>
            <UploadImages
              style="height: auto"
              ref="VueUploadImageLogo"
              v-model="form.logo"
              v-if="displayedLogo"
              :max="1"
              @changed="handleImageLogo"
            />
          </v-col>

          <v-col cols="6" lg="6">
            <label for="cover">Cover</label>
            <ShowsImages
              :items="imagesListCover"
              v-if="true"
              @delete-imagen="deleteImagenCover"
            ></ShowsImages>

            <UploadImages
              style="height: auto"
              ref="VueUploadImagesCover"
              v-model="form.cover"
              v-if="displayedCover"
              :max="1"
              @changed="handleImageCover"
            />
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
              to="/commerce/commerce"
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
      titleForm: "Comercio",
      valid: true,
      loadingCommerceType: false,
      commerceTypeList: [],
      imagesListLogo: [],
      imagesListCover: [],
      displayedLogo: true,
      displayedCover: true,
      form: {
        id: "",
        commerce_type_id: null,
        name: "",
        agent: "",
        email: "",
        phone: "",
        logo: [],
        cover: [],
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceTypeRule: [(v) => !!v || "este campo es obligatorio"],
        agentRule: [(v) => !!v || "este campo es obligatorio"],
        phoneRule: [(v) => !!v || "este campo es obligatorio"],
        emailRule: [
          (v) => !!v || "el este campo es obligatorio",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "el email es invalido",
        ],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({
      storeCommerceTypes: "commerceType/getCommerceTypes",
      storeCommerce: "commerce/getCommerce",
    }),
  },

  watch: {
    storeCommerce(data) {
      data.attachment.map((element) => {
        if (element.column == "logo") {
          this.imagesListLogo = this.attachments([element]);
        } else {
          this.imagesListCover = this.attachments([element]);
        }
      });

      console.log(this.imagesListLogo);
    },
  },

  methods: {
    ...mapActions({
      createCommerce: "commerce/createCommerce",
      getCommerceById: "commerce/getCommerceById",
      updateCommerce: "commerce/updateCommerce",
      getCommerceTypeData: "commerceType/getCommerceTypeData",
      removeAttachment: "attachment/removeAttachment",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("id", this.id);

        formData.append("commerce_type_id", this.form.commerce_type_id);
        formData.append("name", this.form.name);
        formData.append("agent", this.form.agent);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);

        for (let i = 0; i < this.form.logo.length; i++) {
          let file = this.form.logo[i];
          formData.append("logo[" + i + "]", file);
        }
        for (let e = 0; e < this.form.cover.length; e++) {
          let file = this.form.cover[e];
          formData.append("cover[" + e + "]", file);
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
      this.loadingCommerceType = true;
      const rows = [];
      this.getCommerceTypeData().then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.commerceTypeList = rows;
          this.loadingCommerceType = false;
        });
      });
      if (this.id) {
        this.getCommerceById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            agent: result.agent,
            email: result.email,
            phone: result.phone,
            commerce_type_id: result.commerce_type_id,
            logo: [],
            cover: [],
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
      this.createCommerce(payload)
        .then((result) => {
          if (result) {
            this.$refs.form.reset();
            this.$refs.VueUploadImagesCover.Imgs = [];
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
      this.updateCommerce({ payload, id })
        .then((result) => {
          if (result) {
            this.$refs.VueUploadImagesCover.Imgs = [];
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
    handleImageCover(event) {
      this.form.cover = event;
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
    deleteImagenCover(id) {
      const index = this.imagesListCover.findIndex((x) => x.id === id);
      const attachments = [...this.imagesListCover];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesListCover = attachments;
        }
      });
    },
  },
};
</script>