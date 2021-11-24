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
            path: 'promotion/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemove"
          @entities-button="entitiesButton"
        ></DataTable>
      </v-col>
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
    </v-card>
  </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import ButtonRegister from "./components/ButtonRegister";
import ButtonCrudTable from "./components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";

export default {
  name: "Promotion",
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
        text: "Promociones",
        disabled: false,
        to: "#",
      },
      {
        text: "Promociones",
        disabled: true,
      },
    ],

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Promociones",
    messageDialog: "",
    textSnackBar: "",
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
      {
        text: "Fecha de Expiración",
        align: "start",
        sortable: false,
        value: "expire_dates",
      },
      {
        text: "Aplica para...",
        align: "start",
        sortable: false,
        value: "to",
      },
      {
        text: "Acepta Cupon?",
        align: "start",
        sortable: false,
        value: "accept_cupon",
      },
      {
        text: "Tipo Descuento",
        align: "start",
        sortable: false,
        value: "tipo_descuento",
      },
      {
        text: "Descuento",
        align: "start",
        sortable: false,
        value: "amount",
      },
    ],
    items: [],
  }),
  computed: {
    ...mapGetters({ storePromotions: "promotion/getPromotions" }),
  },
  watch: {
    storePromotions(data){
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },

  methods: {
    ...mapActions({
      getPromotionData: "promotion/getPromotionData",
      removePromotion: "promotion/removePromotion",
    }),

    editButton({ id }) {
      this.$router.push("promotion/edit/" + id);
    },
    entitiesButton({ id }) {
      this.$router.push("promotion/entities/" + id);
    },
    acceptRemove(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() { 
      this.removePromotion(this.idDelete)
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
    this.getPromotionData();
  },
};
</script>