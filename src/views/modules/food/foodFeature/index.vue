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
          {{ titleForm }}: {{data_food.name}}
        </h3>
      </v-card-text>
      <RegistrarFeature
        :idfood="idfood"
        @add-new-items="addNewItems"
      ></RegistrarFeature>

      <v-col cols="12" lg="12" sm="12">
        <DataTable
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
    
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import RegistrarFeature from "./Register";
import { mapGetters, mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";

export default {
  name: "FoodFeature",
  props: {
    idfood: String,
  },
  components: {
    DataTable,
    DialogConfirm,
    RegistrarFeature,
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
        text: "Comida",
        disabled: false,
        to: "#",
      },
      {
        text: "Características de la Comida",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Características de la Comida",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      { text: "Tipo de Característica", value: "type_feature.value" },
      { text: "Nombre", value: "name" },
      { text: "Precio", value: "set_precio" },
      { text: "Estatus", value: "status" },
    ],
    items: [],
    idDelete: "",
    data_food: "",
    textSnackBar: "",
  }),

  computed: {
    ...mapGetters({ storeFoodFeature: "foodFeature/getFoodFeatures" }),
  },
  watch: {
    storeFoodFeature(data) {
      if (data.length > 0) {
        this.items = data;
      }
    },
  },

  methods: {
    ...mapActions({
      getFoodFeaturesData: "foodFeature/getFoodFeaturesData",
      removeFoodFeature: "foodFeature/removeFoodFeature",
      food: "food/getFoodById",
      updateFoodFeature: "foodFeature/updateFoodFeature",      
    }),
    addNewItems(item) {
      this.items.push(item);
    },    
    editButton(item) {
      const payload = item;   
      this.updateFoodFeature(payload)
        .then((result) => {
          if (result) {
            this.getFoodFeaturesData(this.idfood);
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
    acceptRemoveCommerceType(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeFoodFeature(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
    getDataFood(id) {
      this.food(id).then((result) => {
        this.data_food = Object.assign({}, result);
        console.log("asd", this.data_food);
      });
    },
  },

  mounted() {
    this.getFoodFeaturesData(this.idfood);
    this.getDataFood(this.idfood);
  },
};
</script>