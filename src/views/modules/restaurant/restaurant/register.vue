<template>
  <v-card class="mb-7">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="pa-5 border-bottom">
        <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
          Restaurante
        </h3>
        <h6 class="subtitle-2 font-weight-light">
          En este formulario se registran todos los restaurantes
        </h6>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingRestaurantType"
              label="Tipo de restaurante"
              :items="restaurantTypeList"
              v-model="form.restaurant_type_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.restaurant_type_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingCommerce"
              label="Comercio a que pertenece el restaurante"
              :items="commerceList"
              v-model="form.commerce_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.commerce_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingDepartment"
              label="Departamento a que pertenece el restaurante"
              :items="departmentList"
              v-model="form.department_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.department_id"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6">
            <v-select
              :loading="loadingMunicipality"
              label="Municipio a que pertenece el restaurante"
              :items="municipalityList"
              v-model="form.municipality_id"
              filled
              required
              background-color="transparent"
              :error-messages="errorsBags.municipality_id"
            ></v-select>
          </v-col>
          <!-- <v-col cols="12" lg="6">
            <v-file-input
              label="Logo"
              v-model="form.logo"
              background-color="transparent"
              :error-messages="errorsBags.logo"
            ></v-file-input>
          </v-col>
          <v-col cols="12" lg="6">
            <v-file-input
              label="Cover"
              v-model="form.cover"
              background-color="transparent"
              :error-messages="errorsBags.cover"
            ></v-file-input>
          </v-col> -->
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Breve descripción"
              filled
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.phone"
              label="Teléfono principal del Restaurante"
              filled
              background-color="transparent"
              :error-messages="errorsBags.phone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.phone_2"
              label="Teléfono alterno del restaurante"
              filled
              background-color="transparent"
              :error-messages="errorsBags.phone_2"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12"></v-col>
          <v-col cols="12" lg="6" class="mb-2">
            <UploadImages
              v-if="displayed"
              :max="1"
              @change="onFileSelected"
              uploadMsg="Click para subir o arrastra una imagen de Logo"
            />
            <br />
          </v-col>
          <v-col cols="12" lg="6" class="mb-2">
            <UploadImages
              v-if="displayed"
              :max="1"
              @change="onFileSelected1"
              uploadMsg="Click para subir o arrastra una imagen de Cover"
            />
          </v-col>
          <v-col cols="12" lg="12" class="mb-4">
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
        <v-btn
          color="black"
          class="text-capitalize"
          to="/restaurant/restaurant"
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
import UploadImages from "vue-upload-drop-images";

export default {
  name: "RegisterRestaurant",
  props: {
    id: String
  },
  components: {
    SnackBar,
    UploadImages
  },

  data() {
    return {
      displayed: true,
      textSnackBar: "",
      valid: true,
      loadingCommerce: false,
      loadingRestaurantType: false,
      loadingDepartment: false,
      loadingMunicipality: false,
      commerceList: [],
      restaurantTypeList: [],
      departmentList: [],
      municipalityList: [],
      errorsBags: [],
      logoFiles: [],
      coverFiles: [],
      form: {
        id: "",
        commerce_id: "",
        restaurant_type_id: "",
        department_id: "",
        municipality_id: "",
        description: "",
        logo: null,
        cover: null,
        phone_2: "",
        enabled: true
      }
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    ...mapActions({
      createRestaurant: "restaurant/createRestaurant",
      getRestaurantById: "restaurant/getRestaurantById",
      updateRestaurant: "restaurant/updateRestaurant",
      getCommercesData: "commerce/getCommercesData",
      getRestaurantTypeData: "restaurantType/getRestaurantTypeData",
      getDepartmentsData: "department/getDepartmentsData",
      getMunicipalitiesData: "municipality/getMunicipalitiesData"
    }),
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = new FormData();
        for (var key in this.form) {
          if (key) {
            let enabled = this.form[key] ? 1 : 0;
            payload.append(key, enabled);
          } else {
            payload.append(key, this.form[key]);
          }
        }

        this.logoFiles.forEach((e) => {
          payload.append("logo[]", e);
        });
        this.coverFiles.forEach((e) => {
          payload.append("cover[]", e);
        });

        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      this.loadingCommerce = true;
      this.loadingRestaurantType = true;
      this.loadingDepartment = true;
      this.loadingMunicipality = true;
      const commerces = [];
      const departments = [];
      const municipalities = [];
      const restaurantTypes = [];
      this.getCommercesData().then((result) => {
        result.map((element) => {
          commerces.push({
            value: element.id,
            text: element.name
          });
          this.commerceList = commerces;
        });
        this.loadingCommerce = false;
      });
      this.getRestaurantTypeData().then((result) => {
        result.map((element) => {
          restaurantTypes.push({
            value: element.id,
            text: element.name
          });
          this.restaurantTypeList = restaurantTypes;
        });
        this.loadingRestaurantType = false;
      });
      this.getDepartmentsData().then((result) => {
        result.map((element) => {
          departments.push({
            value: element.id,
            text: element.name
          });
          this.departmentList = departments;
        });
        this.loadingDepartment = false;
      });
      this.getMunicipalitiesData().then((result) => {
        result.map((element) => {
          municipalities.push({
            value: element.id,
            text: element.name
          });
          this.municipalityList = municipalities;
        });
        this.loadingMunicipality = false;
      });
      if (this.id) {
        this.getRestaurantById(this.id).then((result) => {
          this.form = Object.assign({}, result);
        });
      }
    },

    create(payload) {
      this.createRestaurant(payload)
        .then((result) => {
          if (result) {
            this.form = {};
            this.$refs.form.reset();
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Guardado existosamente!";
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
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
      this.updateRestaurant(payload)
        .then((result) => {
          if (result) {
            this.$refs.snackBarRef.changeStatusSnackbar(true);
            this.textSnackBar = "Actualizado existosamente!";
            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });
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
    onFileSelected(event) {
      this.logoFiles = event;
    },
    onFileSelected1(event) {
      this.coverFiles = event;
    }
  }
};
</script>
