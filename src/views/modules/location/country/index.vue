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
            path: 'country/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCountry"
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
  name: "Company",
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
        text: "Ubicación",
        disabled: false,
        to: "#",
      },
      {
        text: "País",
        disabled: true,
      },
    ],
    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "País",
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
      { text: "Codigo", value: "code" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeCountries: "country/getCountries" }),
  },
  watch: {
    storeCountries(data) {
        this.items=[];
      if (data.length > 0) {             
         this.items = data;        
    }
  },
  },
  methods: {
    ...mapActions({
      getCountryData: "country/getCountryData",
      removeCountry: "country/removeCountry",
    }),
    editButton({ id }) {
      this.$router.push("country/edit/" + id);
    },
    acceptRemoveCountry(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeCountry(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getCountryData();
  },
};
</script>