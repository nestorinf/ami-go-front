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
            path: 'commerce-direction/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCommerceDirection"
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
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Commerce",
  components: {
    DataTable,
    DialogConfirm,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Comercio",
        disabled: false,
        to: "#",
      },
      {
        text: "Dirección Comercio",
        disabled: true,
      },
    ],

    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Dirección Comercio",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Tipo de Comercio",
        value: "commerce_type",
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
    ...mapGetters({ storeCommerceDirection: "commerceDirection/getCommerceDirections" }),
  },
  watch: {
    storeCommerceDirection(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getCommerceDirectionsData: "commerceDirection/getCommerceDirectionsData",
      removeCommerceDirection: "commerceDirection/removeCommerceDirection",
    }),
    editButton({ id }) {
      this.$router.push("commerce-direction/edit/" + id);
    },
    acceptRemoveCommerceDirection(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeCommerceDirection(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getCommerceDirectionsData();
  },
};
</script>