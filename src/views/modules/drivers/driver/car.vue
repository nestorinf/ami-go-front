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
            <v-select
              :loading="loadinglistTypeVh"
              label="Tipo Vehículo"
              :items="TypeVhList"
              v-model="form.type"
              filled
              required
              :rules="rules.typeRule"
              background-color="transparent"
              :error-messages="errorsBags.type"
            ></v-select>
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
            <v-select
              :loading="loadingColour"
              label="Color"
              :items="colourList"
              v-model="form.colour"
              filled
              required
              background-color="transparent"
              :rules="rules.colourRule"
              :error-messages="errorsBags.colour"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-menu v-model="menu" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-text-field
                  number
                  v-model="form.year"
                  label="Año"
                  filled
                  :rules="rules.yearRule"
                  background-color="transparent"
                  v-on="on"
                  elevation="0"
                ></v-text-field>
              </template>
              <v-date-picker
                type="month"
                v-model="picker"
                @click="menu = false"
              />
            </v-menu>
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
          v-if="form.id"
          color="danger"
          @click="acceptRemove"
          :disabled="!valid"
          submit
          class="text-capitalize mr-2"
          >Eliminar</v-btn
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
    <DialogConfirm
      ref="DialogConfirm"
      @handler-dialog-confirm="removeButton"
      :message="messageDialog"
    ></DialogConfirm>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import SnackBar from "@/views/modules/components/SnackBar";
import DialogConfirm from "../../components/DialogConfirm";
export default {
  name: "RegisterDriverCarCar",
  props: {
    id: String,
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  components: {
    SnackBar,
    DialogConfirm,
  },

  data() {
    return {
      loadingColour: false,
      loadinglistTypeVh: false,
      menu: false,
      messageDialog: "",
      textSnackBar: "",
      valid: true,
      errorsBags: [],
      colourList: [],
      TypeVhList: [],
      form: {
        id: false,
        driver_id: "",
        license_plate: "",
        model: "",
        brand: "",
        colour: "",
        year: "",
        type: "",
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
    picker: {
      get() {
        return this.value;
      },
      set(val) {
        this.menu = false;
        this.form.year = val;
        this.$emit("input", val);
      },
    },
  },
  methods: {
    ...mapActions({
      createDriverCar: "driverCar/createDriverCar",
      driver: "driverCar/getDriverCarById",
      updateDriverCar: "driverCar/updateDriverCar",
      removeDriverCar: "driverCar/removeDriverCar",
      listColours: "referenceList/getReferenceListByReferenceSlugData",
      listTypeVh: "referenceList/getReferenceListByReferenceSlugData",
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        payload["id"] = this.id;
        payload["driver_id"] = this.id;
        if (this.id) {
          this.update(payload);
        }
      }
    },
    acceptRemove() {
      this.idDelete = this.form.id;

      this.$refs.DialogConfirm.changeStateDialog(true);
    },
    removeButton() {
      this.removeDriverCar(this.idDelete)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Eliminado existosamente!";
            this.$refs.form.reset();
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

      this.$refs.DialogConfirm.changeStateDialog(false);
    },
    setData() {
      this.loadingColour = true;
      this.loadinglistTypeVh = true;
      const rows = [];
      const rowsTypeVh = [];

      const referenceId = "COLOURS";
      this.listColours(referenceId)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.value,
              });
              this.colourList = rows;
            });
          }
          this.loadingColour = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingColour = false;
        });

      const referenceIdTypeVh = "TYPE_CARS";
      this.listTypeVh(referenceIdTypeVh)
        .then((result) => {
          if (result) {
            result.map((element) => {
              rowsTypeVh.push({
                value: element.id,
                text: element.value,
              });
              this.TypeVhList = rowsTypeVh;
            });
          }
          this.loadinglistTypeVh = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingColour = false;
        });

      if (this.id) {
        this.driver(this.id).then((result) => {
          console.log(result);
          if (Object.keys(result).length > 0) {
            this.form = Object.assign({}, result);
          }
        });
      }
    },
    update(payload) {
      this.updateDriverCar(payload)
        .then((result) => {
          if (result) {
            this.form = result;
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