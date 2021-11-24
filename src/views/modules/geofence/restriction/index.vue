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
            path: 'restriction/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveGeofenceRestriction"
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
  name: "Geofence",
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
        text: "GeoCerca",
        disabled: false,
        to: "#",
      },
      {
        text: "Restricción",
        disabled: true,
      },
    ],

    messageDialog: "",
    textSnackBar: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Restricciones",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Departamento",
        value: "department",
      },
      {
        text: "Municipio",
        value: "municipality",
      },
      {
        text: "Zona de Cobertura",
        value: "geofence",
      },
      {
        text: "Nombre",
        value: "name",
      },
      // { text: "GeoCerca", value: "geofence" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({
      storeGeofenceRestrictions: "geofenceRestriction/getGeofenceRestrictions",
    }),
  },
  watch: {
    storeGeofenceRestrictions(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getGeofenceRestrictionData:
        "geofenceRestriction/getGeofenceRestrictionData",
      removeGeofenceRestriction:
        "geofenceRestriction/removeGeofenceRestriction",
    }),
    editButton({ id }) {
      this.$router.push("restriction/edit/" + id);
    },
    acceptRemoveGeofenceRestriction(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeGeofenceRestriction(this.idDelete)
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
    this.getGeofenceRestrictionData();
  },
};
</script>