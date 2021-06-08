<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          {{ titleForm }}
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todas los comercios
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerceType"
              label="Tipo de Comercio"
              :items="commerceTypeList"
              v-model="form.commerce_type_id"
              filled
              required
              :rules="rules.commerceTypeRule"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del comercio"
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
              label="Email Comercio"
              required
              filled
              :rules="rules.emailRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.agent"
              label="Persona Contacto"
              filled
              required
              :rules="rules.agentRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.phone"
              label="Telefono Persona Contacto"
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
          to="/configuration/commerce"
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
import { mapActions, mapGetters } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
export default {
  name: "RegisterCommerce",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Comercio",
      valid: true,
      loadingCommerceType: false,
      commerceTypeList: [],
      form: {
        id: "",
        commerce_type_id: null,
        name: "",
        agent: "",
        email: "",
        phone: "",
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceTypeRule: [(v) => !!v || "este campo es obligatorio"],
        agentRule: [(v) => !!v || "este campo es obligatorio"],
        phoneRule: [(v) => !!v || "este campo es obligatorio"],
        emailRule: [
          (v) => !!v || "el este campo es obligatorio",
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "el email es invalido",
        ],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ storeCommerceTypes: "commerceType/getCommerceTypes" }),
  },

  methods: {
    ...mapActions({
      createCommerce: "commerce/createCommerce",
      getCommerceById: "commerce/getCommerceById",
      updateCommerce: "commerce/updateCommerce",
      getCommerceTypeData: "commerceType/getCommerceTypeData",
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
      this.loadingCommerceType = true;
      const rows = [];
      this.getCommerceTypeData().then((result) => {
        result.map((element) => {
          rows.push({
            value: element.id,
            text: element.name,
          });
          this.commerceTypeList = rows;
          this.loadingCommerceType = false;
        });
      });
      if (this.id) {
        this.getCommerceById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            agent: result.agent,
            email: result.email,
            phone: result.phone,
            commerce_type_id: result.commerce_type_id,
          };
        });
      }
    },

    create(payload) {
      this.createCommerce(payload)
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
      this.updateCommerce(payload)
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