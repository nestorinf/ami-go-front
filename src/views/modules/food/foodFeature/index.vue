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
            title: 'Añadir',
            path: '/food/food/features/2/add',
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
  name: "FoodFeature",
  props: {
    idfood: String,
  },
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
      { text: "Clasificación", value: "type_feature.value" },
      { text: "Nombre", value: "name" },
      { text: "Precio", value: "set_precio" },
    ],
    items: [],
    idDelete: "",
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
    }),
    editButton({ id }) {
      this.$router.push(id+"/edit/"+this.idfood);
    },
    acceptRemoveCommerceType(item) {  
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeFoodFeature(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
      // this.getFoodFeaturesData();
    },
  },

  mounted() {
    this.getFoodFeaturesData(this.idfood);
  },
};
</script>