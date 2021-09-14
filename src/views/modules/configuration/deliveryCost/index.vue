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
            path: 'delivery-cost/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveDeliveryCost"
        >
        </DataTable>
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
  name: "DeliveryCost",
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
        text: "Configuracion",
        disabled: false,
        to: "#",
      },
      {
        text: "Costo Delivery",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Costo Delivery",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
    //   {
    //     text: "Referencia",
    //     value: "reference",
    //   },
      {
        text: "Kilometros",
        align: "start",
        value: "value",
      },
    //   {
    //     text: "Id Lista Referencia",
    //     value: "id",
    //   },
      {
        text: "Costo",
        value: "alternative",
      },
    //   {
    //     text: "Valor Json",
    //     value: "json_value",
    //   },
      {
        text: "Habilitado",
        value: "enabled_text",
      },

      // { text: "Categoria Padre", value: "category_father" },
    ],
    items: [],
    idDelete: "",
  }),
  computed: {
    ...mapGetters({ storeDeliveryCosts: "deliveryCost/getDeliveryCosts" }),
  },
  watch: {
    storeDeliveryCosts(data) {
      this.items = [];
      if (data.length > 0) {
        data.map((element) => {
          this.items.push(
            {
              id: element.id,
            //   reference: element.reference,
              value: element.value,
              alternative: element.alternative,
            //   json_value: element.json_value,
              enabled: element.enabled,
              enabled_text: element.enabled ? "Si" : "No",
            }
          );
        });
      }
    },
  },
  methods: {
    ...mapActions({
      getDeliveryCostData: "deliveryCost/getDeliveryCostData",
      removeDeliveryCost: "deliveryCost/removeDeliveryCost",
    }),
    editButton({ id }) {
      this.$router.push("delivery-cost/edit/" + id);
    },
    acceptRemoveDeliveryCost(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeDeliveryCost(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },
  mounted() {
    this.getDeliveryCostData();
  },
};
</script>