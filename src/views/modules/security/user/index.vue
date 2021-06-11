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
            path: 'user/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCommerceType"
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
  name: "User",
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
        text: "Usuario",
        disabled: false,
        to: "#",
      },
      {
        text: "Usuario",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Usuario",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre del Usuario",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Comercio", value: "commerce_name" },
      { text: "Nombre del Usuario", value: "name" },
      { text: "Email del Usuario", value: "email" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeUser: "user/getUsers" }),
  },
  watch: {
    storeUser(data) {
      if (data.length > 0) {
        this.items = data;
      }
    },
  },

  methods: {
    ...mapActions({
      getUsersData: "user/getUsersData",
      removeUser: "user/removeUser",
    }),
    editButton({ id }) {
      this.$router.push("user/edit/" + id);
    },
    acceptRemoveCommerceType(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeUser(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
      // this.getUsersData();
    },
  },

  mounted() {
    this.getUsersData();
  },
};
</script>