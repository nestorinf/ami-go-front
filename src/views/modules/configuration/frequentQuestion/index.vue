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
            path: 'frequent-question/register',
          }"
          :headers="headers"
          :items="items"
          :loading="true"
          @edit-button="editButton"
          @remove-button="acceptRemoveFrequentQuestion"
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
        text: "Pregunta Frecuenta",
        disabled: true,
      },
    ],
    messageDialog: "",

    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Pregunta Frecuente",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      {
        text: "Pregunta",
        // align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Respuesta", value: "description" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeFrequentQuestions: "frequentQuestion/getFrequentQuestions" }),
  },
  watch: {
    storeFrequentQuestions(data) {
      this.items=[];
      if (data.length > 0) {        
          if (data.length > 0) {
        this.items = data;
      }
    }
  },
  },
  methods: {
    ...mapActions({
      getFrequentQuestionData: "frequentQuestion/getFrequentQuestionData",
      removeFrequentQuestion: "frequentQuestion/removeFrequentQuestion",
    }),
    editButton({ id }) {
      this.$router.push("frequent-question/edit/" + id);
    },
    acceptRemoveFrequentQuestion(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeFrequentQuestion(this.idDelete);
      this.$refs.DialogConfirm.changeStateDialog(false);
    },
  },

  mounted() {
    this.getFrequentQuestionData();
  },
};
</script>