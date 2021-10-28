<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Provincia
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
        En este formulario se registran todas las Provincias
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCountries"
              label="País *"
              :items="countriesLists"
              v-model="form.country_id"
              filled
              required
              :rules="rules.country_idRule"
              background-color="transparent"
              :error-messages="errorsBags.country_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre *"
              filled
              required
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="">
            <v-text-field
              v-model="form.iso31662"
              label="Código Provincia *"
              filled
              required
              :rules="rules.iso31662Rule"
              background-color="transparent"
              :error-messages="errorsBags.iso31662"
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
          to="/location/province"
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
import { handleMessage } from "@/utils";
export default {
  name: "RegisterProvince",
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
      loadingCountries: false,
      countriesLists: [],
      errorsBags: [],
      form: {
        id: "",
        country_id: "",
        name: "",
        iso31662: "",
      },
      rules: {
        country_idRule: [(v) => !!v || "este campo es obligatorio"],
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        iso31662Rule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getProvinces() {
      return this.$store.state.province.provinces;
    },
  },
  methods: {
    ...mapActions({
      createProvince: "province/createProvince",
      getProvinceById: "province/getProvinceById",
      updateProvince: "province/updateProvince",
      getCountryData: "country/getCountryData",
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
      this.loadingCountries = true;
      const rows = [];
      this.getCountryData()
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.countriesLists = rows;
            });
          }
          this.loadingCountries = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCountries = false;
        });
      if (this.id) {
        this.getProvinceById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            country_id: result.country_id,
            iso31662: result.iso31662,
          };
        });
      }
    },

    create(payload) {
      this.createProvince(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Guardado existosamente!", 200, this);
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },

    update(payload) {
      this.updateProvince(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            handleMessage("Actualizado existosamente!", 200, this);
          }
        })
        .catch((err) => {
          const {
            data: { message },
            status,
          } = err.response;
          handleMessage(message, status, this);
        });
    },
  },
};
</script>