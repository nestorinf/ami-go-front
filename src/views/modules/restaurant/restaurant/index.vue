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
            path: 'restaurant/register',
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
  name: "Restaurant",
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
        text: "Restaurante",
        disabled: false,
        to: "#",
      },
      {
        text: "Restaurantes",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Restaurante",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      { text: "Nombre", value: "name" },
      { text: "Departamento", value: "department_name" },
      { text: "Municipio", value: "municipality_name" },
      { text: "Tipo de restaurante", value: "restaurant_type_name" },
      // { text: "Logo", value: "logo" },
      // { text: "Cover", value: "cover" },
      { text: "Descripción", value: "description" },
      { text: "Teléfono", value: "phone" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeRestaurant: "restaurant/getRestaurants" }),
  },
  watch: {
    storeRestaurant(data) {
      if (data.length > 0) {
        this.items = data;
      }
    },
  },

  methods: {
    ...mapActions({
      getRestaurantsData: "restaurant/getRestaurantsData",
      removeRestaurant: "restaurant/removeRestaurant",
    }),
    editButton({ id }) {
      this.$router.push("restaurant/edit/" + id);
    },
    acceptRemoveCommerceType(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeRestaurant(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
      // this.getRestaurantsData();
    },
  },

  mounted() {
    this.getRestaurantsData();
  },
};
</script>