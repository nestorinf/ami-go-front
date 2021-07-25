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
            path: 'commerce-group/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveCommerceGroup"
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
  name: "Commerce",
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
        text: "Comercio",
        disabled: false,
        to: "#",
      },
      {
        text: "Agrupar Comercios",
        disabled: true,
      },
    ],

    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Agrupacion Comercios",
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
        text: "Comercios",
        align: "start",
        sortable: false,
        value: "commerces",
      },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({
      commerceGroups: "commerceGroup/getCommerceGroups",
    }),
  },
  watch: {
    commerceGroups(data) {
      const rows = [];
      data.map((element) => {
        rows.push({
          id: element.id,
          name: element.name,
          commerces: this.parseCommerce(element.commerces),
        });
      });
      this.items = rows;
    },
  },
  methods: {
    ...mapActions({
      getCommerceGroupData: "commerceGroup/getCommerceGroupData",
      removeCommerceGroup: "commerceGroup/removeCommerceGroup",
    }),
    editButton({ id }) {
      this.$router.push("commerce-group/edit/" + id);
    },
    parseCommerce(commerce) {
      return commerce.map((element) => {
        return element.commerce.name + " - " + element.name;
      });
    },
    acceptRemoveCommerceGroup(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeCommerceGroup(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getCommerceGroupData();
  },
};
</script>