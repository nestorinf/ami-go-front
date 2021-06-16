<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
      </v-card-text>

      <v-col cols="12" lg="12" sm="12">
        <UploadImages :max="1" @change="onFileSelected" /> <br />
        <v-btn color="success" @click="onUpload">Upload Image</v-btn>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

export default {
  name: "UploadImage",
  components: { UploadImages },
  data: () => ({
    page: {
      title: "Subir Imagenes"
    },
    breadcrumbs: [
      {
        text: "Configuracion",
        disabled: false,
        to: "#"
      },
      {
        text: "Subir Imagenes",
        disabled: true
      }
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Subir Imagenes",
    idDelete: "",
    selectedFile: null
  }),

  computed: {
    ...mapGetters({ storeImage: "image/getImages" })
  },
  watch: {
    storeImage(data) {
      if (data.length > 0) {
        this.items = data;
      }
    }
  },
  methods: {
    ...mapActions({
      getImagesData: "image/getImagesData",
      removeImage: "image/removeImage",
      createImage: "image/createImage"
    }),
    editButton({ id }) {
      this.$router.push("image/edit/" + id);
    },
    acceptRemoveImage(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeImage(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
    onFileSelected(event) {
      this.selectedFile = event;
    },
    onUpload() {
      const fd = new FormData();
      fd.append("image", this.selectedFile);
      this.createImage(fd);
    }
  },

  mounted() {
    this.getImagesData();
  }
};
</script>
