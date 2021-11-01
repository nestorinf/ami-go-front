<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Categoria de Comercio
      </h3>
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
        En este formulario se registran todos las Categorias de Comercio
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombre de la categoria *"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.description"
              label="Descripcion *"
              filled
              required
              :rules="rules.descriptionRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerceTypeSlug"
              label="Slug Tipo de Comercio *"
              :items="commerceTypeSlugList"
              v-model="form.commerce_type_slug"
              filled
              required
              :rules="rules.commerceTypeSlugRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12">
            <v-checkbox v-model="form.is_lock" label="Bloqueado"></v-checkbox>
          </v-col>

          <v-col cols="8">
            <ShowsImages
              :items="imagesList"
              v-if="true"
              @delete-imagen="deleteImagen"
            ></ShowsImages>
          </v-col>

          <v-col cols="12" lg="12">
            <UploadImages
              ref="VueUploadImages"
              v-model="form.images"
              v-if="displayed"
              :max="1"
              @changed="handleImages"
            />
          </v-col>
        </v-row>

        <v-col>
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
        </v-col>
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
import { handleMessage } from "@/utils";
export default {
  name: "RegisterCommerceType",
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
      valid: true,
      displayed: true,
      selectedFile: [],
      loadingCommerceTypeSlug: true,
      commerceTypeSlugList: [],
      imagesList: [],
      form: {
        id: "",
        name: "",
        description: "",
        commerce_type_slug: "",
        is_lock: 0,
        images: [],
      },

      rules: {
        nameRule: [(v) => !!v || "es campo es obligatorio"],
        descriptionRule: [(v) => !!v || "este campo es obligatorio"],
        commerceTypeSlugRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },

  computed: {
    ...mapGetters({ storeAttachement: "commerceType/getCommerceType" }),
  },

  watch: {
    storeAttachement(data) {
      if (data.attachment.length > 0) {
        this.imagesList = Object.assign([], this.attachments(data.attachment));
      }
    },
  },

  methods: {
    ...mapActions({
      createCommerceType: "commerceType/createCommerceType",
      commerceType: "commerceType/getCommerceTypeById",
      updateCommerceType: "commerceType/updateCommerceType",
      removeAttachment: "commerceType/removeAttachment",
      getCommerceSlug: "referenceList/getReferenceListByReferenceSlugData",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("id", this.id);
        formData.append("is_lock", this.form.is_lock ? 1 : 0);
        formData.append("name", this.form.name);
        formData.append("description", this.form.description);
        formData.append("commerce_type_slug", this.form.commerce_type_slug);

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
      this.loadCommerceTypeSlug();
      if (this.id) {
        this.commerceType(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            description: result.description,
            is_lock: result.is_lock,
            commerce_type_slug: result.commerce_type_slug,
            images: [],
          };
        });
      }
    },

    loadCommerceTypeSlug() {
      const slugName = "TYPE_COMMERCE_SLUG";
      const rows = [];
      this.getCommerceSlug(slugName).then((response) => {
        console.log(response);
        response.map((element) => {
          rows.push({
            value: element.value,
            text: element.value,
          });
          this.loadingCommerceTypeSlug = false;
          this.commerceTypeSlugList = rows;
        });
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
      this.createCommerceType(payload)
        .then((result) => {
          if (result) {
            this.$refs.form.reset();
            this.$refs.VueUploadImages.Imgs = [];

            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
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

    handleImages(event) {
      this.form.images = event;
    },

    update(payload, id) {
      this.updateCommerceType({ payload, id })
        .then((result) => {
          if (result) {
            this.$refs.VueUploadImages.Imgs = [];
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
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
  },
};
</script>