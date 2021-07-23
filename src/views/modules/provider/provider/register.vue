<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Proveedor
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos los proveedores de productos
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :items="providerType"
              v-model="form.providerType_id"
              filled
              required
              :rules="rules.providerTypeRule"
              :loading="loadingProviderType"
              label="Tipo Proveedor"
              background-color="transparent"
            ></v-select>
            </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del Proveedor"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              type="email"
              v-model="form.email"
              label="Email del Proveedor"
              required
              filled
              :rules="rules.emailRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.agent"
              label="Persona Contacto del Proveedor"
              filled
              required
              :rules="rules.agentRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.code_provider"
              label="Codigo del Proveedor"
              filled
              required
              :rules="rules.codeProviderRule"
              background-color="transparent"
            ></v-text-field>
          </v-col> -->
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.phone"
              label="Telefono del Proveedor"
              filled
              required
              :rules="rules.phoneRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          color="success"
          @click="save"
          :disabled="!valid"
          submit
          class="text-capitalize mr-2"
          >Guardar</v-btn
        >
        <v-btn
          color="black"
          class="text-capitalize"
          to="/provider/provider"
          dark
          >Cancelar</v-btn
        >
      </v-card-text>
    </v-form>
    <SnackBar
      :text="textSnackBar"
      ref="snackBarRef"
      :snackbar="true"
    ></SnackBar>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterProvider",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      providerType: [],
      loadingProviderType: false,
      valid: true,
      form: {
        id: "",
        name: "",
        agent: "",
        email: "",
        providerType_id: "",
        // code_provider: "",
        phone: "",
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        agentRule: [(v) => !!v || "este campo es obligatorio"],
        phoneRule: [(v) => !!v || "este campo es obligatorio"],
        // codeProviderRule: [(v) => !!v || "este campoo es obligatorio"],
        emailRule: [
          (v) => !!v || "el Email es obligatorio",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "el email es invalido",
        ],
         providerTypeRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createCompany: "provider/createProvider",
      getCompanyById: "provider/getProviderById",
      updateCompany: "provider/updateProvider",
      providerTypeData: "referenceList/getReferenceListByReferenceSlugData",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      // load provider type (providerType)
      this.loadProviderType();

      if (this.id) {
        this.getCompanyById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    loadProviderType() {
      const rows = [];
      this.loadingProviderType = true;
      const referenceId = "PROVIDER_TYPES";
      this.providerTypeData(referenceId)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.providerType = rows;
            });
          }
          this.loadingProviderType = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingUom = false;
        });
    },

    create(payload) {
      this.createCompany(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateCompany(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
  },
};
</script>