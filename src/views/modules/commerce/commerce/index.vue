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
            path: 'commerce/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCommerce"
        ></DataTable>
      </v-col>
    </v-card>
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
    <SnackBar
        :text="textSnackBar"
        ref="snackBarRef"
        :snackbar="true"
    ></SnackBar>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";

export default {
  name: "Commerce",
  components: {
    DataTable,
    DialogConfirm,
    SnackBar,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Configuracion",
        disabled: false,
        to: "#",
      },
      {
        text: "Comercio",
        disabled: true,
      },
    ],

    messageDialog: "",
    textSnackBar: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Comercio",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Tipo de Comercio",
        value: "commerce_type_name",
      },
      {
        text: "Nombre del Comercio",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Persona Contacto", value: "agent" },
      { text: "Email Comercio", value: "email" },
      { text: "Telefono", value: "phone" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeCommerce: "commerce/getCommerces" }),
  },
  watch: {
    storeCommerce(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getCommercesData: "commerce/getCommercesData",
      removeCommerce: "commerce/removeCommerce",
    }),
    editButton({ id }) {
      this.$router.push("commerce/edit/" + id);
    },
    acceptRemoveCommerce(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeCommerce(this.idDelete)
        .then((result) => {
            if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";
            }
        })
        .catch((result) => {       
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = result.response.data.message;
        });
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getCommercesData(0);
  },
};
</script>