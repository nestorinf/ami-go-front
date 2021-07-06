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
        <DataTableDriver
          :dataButtonRegister="{
            title: 'Registrar',
            path: 'driver/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @car-button="carButton"
          @edit-button="editButton"
          @remove-button="acceptRemove"
        ></DataTableDriver>
      </v-col>
      <DialogConfirm
        ref="DialogConfirm"
        @handler-dialog-confirm="removeButton"
        :message="messageDialog"
      ></DialogConfirm>
    </v-card>
  </v-container>
</template>

<script>
import DataTableDriver from "./components/DataTableDriver";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import ButtonRegister from "../../components/ButtonRegister";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Driver",
  components: {
    DataTableDriver,
    DialogConfirm,
  },

  data: () => ({
    page: {
      title: "AmiGo",
    },
    breadcrumbs: [
      {
        text: "Conductores",
        disabled: false,
        to: "#",
      },
      {
        text: "Conductores",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Conductores",
    messageDialog: "",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      }, 
      { text: "Email", value: "email" },
      { text: "Teléfono", value: "phone" },
      { text: "Latitud", value: "latitude" },
      { text: "Longitud", value: "longitude" },
      { text: "Habilitado", value: "enabled" },
    ],
    items: [],
  }),
  computed: {
    ...mapGetters({ storeDrivers: "driver/getDrivers" }),
  },
  watch: {
    storeDrivers(data) {
      const rows = [];
      this.items = rows;
      if (data.length > 0) {
        data.map((element) => {
          rows.push({
            id: element.id,
            name: element.name,
            email: element.email,
            phone: element.phone,
            enabled: element.enabled,
            latitude: element.latitude,
            longitude: element.longitude
          });
        });
        this.items = rows;
      }
      console.log(data);
    },
  },

  methods: {
    ...mapActions({
      getDriverData: "driver/getDriverData",
      removeDriver: "driver/removeDriver",
    }),

    carButton({ id }) {
      this.$router.push("driver/car/" + id);
    },
    editButton({ id }) {
      this.$router.push("driver/edit/" + id);
    },
    acceptRemove(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeDriver(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getDriverData();
  },
};
</script>