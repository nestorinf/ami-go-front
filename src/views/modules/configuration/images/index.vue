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
        <DataTable
          :dataButtonRegister="{
            title: 'Registrar',
            path: 'images/register'
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @remove-button="acceptRemoveImage"
        ></DataTable>
      </v-col>
    </v-card>
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
  </v-container>
</template>

<script>
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DataTable from "../../components/DataTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UploadImage",
  components: { DataTable, DialogConfirm },
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
    titleForm: "Images",
    headers: [
      {
        text: "Accion",
        value: "action"
      },
      {
        text: "Nombre",
        align: "start",
        value: "name"
      },
      {
        text: "Path",
        align: "start",
        value: "path"
      }
    ],
    items: [],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    idDelete: "",
    selectedFile: null,
    displayed: true
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
    }
  },

  mounted() {
    this.getImagesData();
  }
};
</script>
