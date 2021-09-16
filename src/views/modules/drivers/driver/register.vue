<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Conductor
      </h3>
      <v-col>
        <v-alert
          border="left"
          colored-border
          type="error"
          dense
          dismissible
          width="xl"
          mode
        >
          Los Campos con <strong>*</strong> son obligatorios
        </v-alert>
      </v-col>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los conductores
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Nombres y Apellidos *"
              filled
              required
              :rules="rules.nameRule"
              :error-messages="errorsBags.name"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.email"
              type="email"
              label="Correo Electronico *"
              filled
              required
              :rules="rules.emailRule"
              :error-messages="errorsBags.email"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              number
              v-model="form.phone"
              label="Teléfono *"
              filled
              :rules="rules.phoneRule"
              background-color="transparent"
              :error-messages="errorsBags.phone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.enabled"
              required
              label="Habilitado"
              :error-messages="errorsBags.enabled"
            ></v-checkbox>
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
        <v-btn color="black" class="text-capitalize" to="/drivers" dark
          >Cancelar</v-btn
        >
      </v-form>
    </v-card-text>
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
  name: "RegisterDriver",
  props: {
    id: String,
  },
  components: {
    SnackBar,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      errorsBags: [],
      form: {
        id: "",
        name: "",
        phone: "",
        email: "",
        enabled: true,
        latitude: null,
        longitude: null,
      },
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        phoneRule: [(v) => !!v || "este campo es obligatorio"],
        emailRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getDrivers() {
      return this.$store.state.driver.drivers;
    },
  },
  methods: {
    ...mapActions({
      createDriver: "driver/createDriver",
      driver: "driver/getDriverById",
      updateDriver: "driver/updateDriver",
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
      if (this.id) {
        this.driver(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createDriver(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },

    update(payload) {
      this.updateDriver(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
          }
        })
        .catch((err) => {
          if (err.response) {
            this.errorsBags = err.response.data.errors;
            setTimeout(() => {
              this.errorsBags = [];
            }, 4000);
          }
          this.$refs.snackBarRef.changeStatusSnackbar(true);
          this.textSnackBar = "Disculpe, ha ocurrido un error";
        });
    },
  },
};
</script>