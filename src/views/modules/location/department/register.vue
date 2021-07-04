<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Departamento
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos los departamentos
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCountry"
              label="País"
              :items="countryList"
              v-model="form.country_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.country_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.name"
              label="Nombre del departamento"
              filled
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.code"
              label="Código del departamento"
              filled
              background-color="transparent"
              :error-messages="errorsBags.code"
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
          to="/department/department"
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
  name: "RegisterDepartment",
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
      loadingCountry: false,
      countryList: [],
      errorsBags: [],
      form: {
        id: "",
        name: "",
        code: "",
        country_id: "",
      },
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createDepartment: "department/createDepartment",
      getDepartmentById: "department/getDepartmentById",
      updateDepartment: "department/updateDepartment",
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
      this.loadingCountry = true;
      const countries = [];
      this.getCountryData().then((result) => {
        result.map((element) => {
          countries.push({
            value: element.id,
            text: element.name,
          });
          this.countryList = countries;
        });
        this.loadingCountry = false;
      });
      if (this.id) {
        this.getDepartmentById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createDepartment(payload)
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
      this.updateDepartment(payload)
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
