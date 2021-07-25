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
            path: 'restaurant-group/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveRestaurantGroup"
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
        text: "Agrupar Restaurantes",
        disabled: true,
      },
    ],

    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Agrupacion Restaurante",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Grupo",
        value: "name",
      },
      {
        text: "Restaurantes",
        align: "start",
        sortable: false,
        value: "restaurants",
      },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({
      restaurantGroups: "restaurantGroup/getRestaurantGroups",
    }),
  },
  watch: {
    restaurantGroups(data) {
      const rows = [];
      data.map((element) => {
        rows.push({
          id: element.id,
          name: element.name,
          restaurants: this.parseRestaurant(element.restaurants),
        });
      });
      this.items = rows;
    },
  },
  methods: {
    ...mapActions({
      getRestaurantGroupData: "restaurantGroup/getRestaurantGroupData",
      removeRestaurantGroup: "restaurantGroup/removeRestaurantGroup",
    }),
    editButton({ id }) {
      this.$router.push("restaurant-group/edit/" + id);
    },
    parseRestaurant(restaurant) {
      return restaurant.map((element) => {
        return element.restaurant.name + " - " + element.name;
      });
    },
    acceptRemoveRestaurantGroup(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeRestaurantGroup(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getRestaurantGroupData();
  },
};
</script>