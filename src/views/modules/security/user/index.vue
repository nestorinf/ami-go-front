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
          {{ titleForm }} {{typeUSer.name}}
        </h3>
      </v-card-text>
      <v-col cols="12" lg="12" sm="12">
        <DataTable
          :dataButtonRegister="{
            title: 'Registrar',
            path: type+'/register',
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
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-container>
</template>

<script>
import DataTable from "../../components/DataTable";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonCrudTable from "../../components/ButtonCrudTable";
import DialogConfirm from "../../components/DialogConfirm";
import SnackBar from "@/views/modules/components/SnackBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "User",
  props: {
    type: String,
  },
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
        text: "Usuarios",
        disabled: false,
        to: "#",
      },
      {
        text: "Usuarios",
        disabled: true,
      },
    ],
    messageDialog: "",
    textSnackBar: "",
    ButtonRegister: ButtonRegister,
    ButtonCrud: ButtonCrudTable,
    titleForm: "Usuarios",
    headers: [
      {
        text: "Accion",
        value: "action",
      },
      { text: "Role", value: "role_name" },
      {
        text: "Nombre del Usuario",
        align: "start",
        sortable: false,
        value: "name",
      },
      // { text: "Comercio", value: "commerce_name" },
      { text: "Nombre del Usuario", value: "name" },
      { text: "Email del Usuario", value: "email" },
    ],
    items: [],
    idDelete: "",
  }),

  computed: {
    ...mapGetters({ storeUser: "user/getUsers" }),

    typeUSer(){

        var type = this.type;
        var data = null;        
        switch(type) {
            case 'admin':
              data = {
                name: 'Administradores',
                slug: 'ROLE_ROOT'
              };
            break;
            case 'commerces':
              data = {
                name: 'Comercios',
                slug: 'ROLE_COMMERCE'
              };
            break;
            case 'restaurants':
              data = {
                name: 'Restaurantes',
                slug: 'ROLE_RESTAURANT'
              };
            break;
            case 'drivers':
              data = {
                name: 'Conductores',
                slug: 'ROLE_DRIVER'
              };
            break;
            case 'clients':
              data = {
                name: 'Clientes',
                slug: 'ROLE_CLIENT'
              };
            break;
            default:
              data = {
                name: 'Clientes',
                slug: 'ROLE_CLIENT'
              };
            break;
        }
        return data;
    }
  },
  watch: {
    storeUser(data) {
      this.items = [];
      this.resetHeaders();
      if (data.length > 0) {

        this.items = data;

        if(this.type=="commerces" || this.type=="restaurants"){
          this.headers.push({
            text: this.type=="commerces"?"Comercio":"Restaurante",
            align: "start",
            sortable: false,
            value: 'entitie',
          });
        }
      }
    },
    typeUSer(data) {
      this.getUsersData(data.slug);
    },
  },

  methods: {
    ...mapActions({
      getUsersData: "user/getUsersData",
      removeUser: "user/removeUser",
    }),
    
    resetHeaders(){
      this.headers = [
        {
          text: "Accion",
          value: "action",
        },
        { text: "Role", value: "role_name" },
        {
          text: "Nombre del Usuario",
          align: "start",
          sortable: false,
          value: "name",
        },
        // { text: "Comercio", value: "commerce_name" },
        { text: "Nombre del Usuario", value: "name" },
        { text: "Email del Usuario", value: "email" },
      ];
    },
    getUser(slug){
      this.getUsersData(slug).then((result) => {
        this.form = {
          id: result.id,
          name: result.name,
          slug: result.slug,
          enabled: result.enabled,
        };
      });
    },
    editButton({ id }) {
      this.$router.push(this.type+"/edit/" + id);
    },
    acceptRemoveCommerceType(item) {
      this.idDelete = item.id;
      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    
    removeButton() {
      this.removeUser(this.idDelete)
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
    this.getUsersData(this.typeUSer.slug);
  },
};
</script>