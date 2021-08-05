<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        País
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todos los países
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.code"
              label="Código"
              filled
              required
              :rules="rules.codeRule"
              background-color="transparent"
              :error-messages="errorsBags.code"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.latitude"
              label="Latitud"
              filled
              required
              :rules="rules.latitudeRule"
              background-color="transparent"
              :error-messages="errorsBags.latitude"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.longitude"
              label="Longitud"
              filled
              required
              :rules="rules.longitudeRule"
              background-color="transparent"
              :error-messages="errorsBags.longitude"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-checkbox
              v-model="form.is_default"
              filled
              required
              label="Predeterminado"
              :error-messages="errorsBags.is_default"
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/location/country"
          dark
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
  name: "RegisterCountry",
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
        code: "",
        latitude: "",
        longitude: "",
        is_default: 0,
      },
      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        codeRule: [(v) => !!v || "este campo es obligatorio"],
        latitudeRule: [(v) => !!v || "este campo es obligatorio"],
        longitudeRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getCountries() {
      return this.$store.state.country.countries;
    },
  },
  methods: {
    ...mapActions({
      createCountry: "country/createCountry",
      country: "country/getCountryById",
      updateCountry: "country/updateCountry",
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
        this.country(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createCountry(payload)
        .then((result) => {
          if (result) {            
            this.$refs.form.reset();
            this.form = {
                      id: "",
                      name: "",
                      code: "",
                      latitude: "",
                      longitude: "",
                      is_default: 0,
                    },
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
      this.updateCountry(payload)
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