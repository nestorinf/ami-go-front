<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Conductor - Vehículo
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran las datos del Vehículo
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.type"
              label="Tipo Vehículo"
              filled
              required
              :rules="rules.typeRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.model"
              label="Modelo"
              filled
              :rules="rules.modelRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.brand"
              label="Marca"
              filled
              required
              :rules="rules.brandRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.license_plate"
              label="Placa"
              filled
              :rules="rules.licensePlateRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.colour"
              label="Color"
              filled
              required
              :rules="rules.colourRule"
              background-color="transparent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              number
              v-model="form.year"
              label="Año"
              filled
              :rules="rules.yearRule"
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
          to="/drivers"
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
  name: "RegisterDriverCarCar",
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
        driver_id: "",
        license_plate: "",
        model: "",
        brand: "",
        colour: "",
        year: "",
        type: ""
      },
      rules: {
        licensePlateRule: [(v) => !!v || "este campo es obligatorio"],
        modelRule: [(v) => !!v || "este campo es obligatorio"],
        brandRule: [(v) => !!v || "este campo es obligatorio"],
        colourRule: [(v) => !!v || "este campo es obligatorio"],
        yearRule: [(v) => !!v || "este campo es obligatorio"],
        typeRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getDriverCars() {
      return this.$store.state.driver.drivers;
    },
  },
  methods: {
    ...mapActions({
        createDriverCar: "driverCar/createDriverCar",
        driver: "driverCar/getDriverCarById",
        updateDriverCar: "driverCar/updateDriverCar",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        payload['id'] = this.id;
        payload['driver_id'] = this.id;
        if (this.id) {
          this.update(payload);
        } 
      }
    },
    setData() {      
        if (this.id) {
          this.driver(this.id).then((result) => {
            if(result.length>0){
              this.form = Object.assign({}, result);
            }
          });
        }
    },


    update(payload) {
      this.updateDriverCar(payload)
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