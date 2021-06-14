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
        <!-- <UploadImages :max="1" @change="onFilePicked" v-model="files" /> -->
        <label for="images">select</label>
        <input
        id="images"
          ref="uploadDialog"
          type="file"
          name="identification"
          @change="addFile"
        />
        <button @click="uploadImg">upload</button>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import { mapGetters, mapActions } from "vuex";

// import UploadImages from "vue-upload-drop-images";

// import vueFilePond from "vue-filepond";
// import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// const FilePond = vueFilePond(
//   FilePondPluginFileValidateType,
//   FilePondPluginImagePreview
// );

export default {
  name: "UploadImage",
  components: {
    // FilePond
    // UploadImages
  },
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
    image: null
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
    uploadImg() {
      console.log("uploading");
      this.createImage({image: this.image});
    },
    onFilePicked(files) {
      console.log(files);
      let file = files.target.files[0];
      console.log(file);
      this.image = files;
    },
    addFile(e) {
      console.log(1)
      if (e.target.tagName && e.target.tagName === "INPUT") {
        console.log(2)
        this.image = e.target.files[0];
      }
    }
  },

  mounted() {
    this.getImagesData();
  }
};
</script>
