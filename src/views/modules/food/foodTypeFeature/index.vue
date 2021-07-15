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
            path: 'food-type-feature/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveFoodTypeFeature"
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
import DataTable from "./components/DataTableFoodTypeFeature";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import { mapGetters, mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "Company",
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
        text: "Comidas",
        disabled: false,
        to: "#",
      },
      {
        text: "Tipo de características",
        disabled: true,
      },
    ],
    messageDialog: "",

    textSnackBar: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Tipo de características",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "value",
      },
      {
        text: "Requerido",
        align: "start",
        sortable: false,
        value: "values.is_required",
      },
      {
        text: "Multiple",
        align: "start",
        sortable: false,
        value: "values.is_multiple",
      },
      {
        text: "Acepta Precio",
        align: "start",
        sortable: false,
        value: "values.price",
      }, 
      {
        text: "Habilitado",
        align: "start",
        sortable: false,
        value: "enabled",
      }, 
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({
      storeFoodTypeFeatures: "foodTypeFeature/getFoodTypeFeatures",
    }),
  },
  watch: {
    storeFoodTypeFeatures(data) {
      this.items = [];
      if (data.length > 0) {
        this.items = data;
      }
    },
  },
  methods: {
    ...mapActions({
      getFoodTypeFeatureData: "foodTypeFeature/getFoodTypeFeatureData",
      removeFoodTypeFeature: "foodTypeFeature/removeFoodTypeFeature",
    }),
    editButton({ id }) {
      this.$router.push("food-type-feature/edit/" + id);
    },
    acceptRemoveFoodTypeFeature(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeFoodTypeFeature(this.idDelete)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";
          }
        })
        .catch(() => {          
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });

      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getFoodTypeFeatureData();
  },
};
</script>