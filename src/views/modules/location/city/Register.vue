<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Ciudad
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las Ciudades
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col cols="12" lg="12">
            <v-select
              :loading="loadingProvinces"
              label="Provincia"
              :items="provincesLists"
              v-model="form.province_id"
              filled
              required
              :rules="rules.province_idRule"
              background-color="transparent"
              :error-messages="errorsBags.province_id"
            ></v-select>
          </v-col>
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
          <v-col cols="12" lg="">
            <v-text-field
              v-model="form.zip_code"
              label="Código Ciudad"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.zip_code"
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
          to="/location/city"
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
  name: "RegisterCity",
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
      loadingProvinces: false,
      provincesLists: [],
      errorsBags: [],
      form: {
        id: "",
        province_id: "",
        name: "",
        zip_code: "",
      },
      rules: {
        province_idRule: [(v) => !!v || "este campo es obligatorio"],
        nameRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getCities() {
      return this.$store.state.city.cities;
    },
  },
  methods: {
    ...mapActions({
      createCity: "city/createCity",
      getCityById: "city/getCityById",
      updateCity: "city/updateCity",
      getProvinceData: "province/getProvinceData",
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
      this.loadingProvinces = true;
      const rows = [];
      this.getProvinceData().then((result) => {
        if(result) {
          result.map((element) => {
            rows.push({
              value: element.id,
              text: element.name,
            });
            this.provincesLists = rows;
            
          });

        }
        this.loadingProvinces = false;
      }).catch((err) => {
        console.log(err)
        this.loadingProvinces = false; 
      });
      if (this.id) {
        this.getCityById(this.id).then((result) => {
          this.form = {
            id: result.id,
            name: result.name,
            province_id: result.province_id,
            zip_code: result.zip_code
          };
        });
      }
    },

    create(payload) {
      this.createCity(payload)
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
      this.updateCity(payload)
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