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
            path: 'reference-list/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveReferenceList"
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
  name: "ReferenceList",
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
        text: "Lista Referencia",
        disabled: true,
      },
    ],
    messageDialog: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Lista Referencia",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Referencia",
        value: "reference",
      },
      {
        text: "Valor",
        align: "start",
        value: "value",
      },
      {
        text: "Id Lista Referencia",
        value: "id",
      },
      {
        text: "Valor Alternativo",
        value: "alternative",
      },
      {
        text: "Valor Json",
        value: "json_value",
      },
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
    ...mapGetters({ storeReferenceLists: "referenceList/getReferenceLists" }),
  },
  watch: {
    storeReferenceLists(data) {
      this.items = [];
      if (data.length > 0) {
        data.map((element) => {
          this.items.push(
            {
              id: element.id,
              reference: element.reference,
              value: element.value,
              alternative: element.description,
              json_value: element.json_value,
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
      getReferenceListData: "referenceList/getReferenceListData",
      removeReferenceList: "referenceList/removeReferenceList",
    }),
    editButton({ id }) {
      this.$router.push("reference-list/edit/" + id);
    },
    acceptRemoveReferenceList(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeReferenceList(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },
  mounted() {
    this.getReferenceListData();
  },
};
</script>