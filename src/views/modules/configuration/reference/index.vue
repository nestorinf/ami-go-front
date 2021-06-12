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
            path: 'reference/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveReference"
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
        text: "Configuracion",
        disabled: false,
        to: "#",
      },
      {
        text: "Referencia",
        disabled: true,
      },
    ],
    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Referencia",
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
      { text: "Descripcion", value: "description" },
      { text: "Bloqueado", value: "is_lock" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeReferences: "reference/getReferences" }),
  },
  watch: {
    storeReferences(data) {
      if (data.length > 0) {
         data.map((element) =>{
         this.items.push( 
           {
            id:element.id,
            name:element.name,
            description:element.description,
            is_lock:element.is_lock ? 'Sí' : 'No'
            },
        //  element.name;
         )
         
        // this.items = data;
        // this.items[0].description = data.description;
        // this.items[0].is_lock = data.is_lock ? 'Sí' : 'No';
      })
    }
  },
  },
  methods: {
    ...mapActions({
      getReferenceData: "reference/getReferenceData",
      removeReference: "reference/removeReference",
    }),
    editButton({ id }) {
      this.$router.push("reference/edit/" + id);
    },
    acceptRemoveReference(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeReference(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getReferenceData();
  },
};
</script>