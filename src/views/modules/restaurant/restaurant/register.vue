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
              v-model="form.name"
              label="Nombre"
              filled
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="form.description"
              label="Breve descripción"
              filled
              background-color="transparent"
              :error-messages="errorsBags.description"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.phone"
              label="Teléfono principal del Restaurante"
              filled
              background-color="transparent"
              :error-messages="errorsBags.phone"
            ></v-text-field>
          </v-col>
          <v-col cols="6" lg="6">
            <v-text-field
              v-model="form.phone_2"
              label="Teléfono alterno del restaurante"
              filled
              background-color="transparent"
              :error-messages="errorsBags.phone_2"
            ></v-text-field>
          </v-col>
          <v-switch
            v-model="form.enabled"
            inset
            label="Habilitado"
            :error-messages="errorsBags.enabled"
            hide-details
          ></v-switch>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12" class="mb-5">
            <strong
              >Logo y cover (primero selecciona el logo, luego el cover)</strong
            >
            <UploadImages
              v-if="displayed"
              :max="2"
              uploadMsg="Haz clic aquí o arrastra una imagen"
              fileError="Archivo no soportado"
              @changed="onFileSelected"
            />
          </v-col>

          <ShowsImages
            :items="form.images_id"
            @delete-imagen="deleteImagen"
          ></ShowsImages>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
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
          </v-col>
        </v-row>
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
import ShowsImages from "../../components/ShowsImages";
export default {
  name: "RegisterRestaurant",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    UploadImages,
    ShowsImages,
  },

  data() {
    return {
      textSnackBar: "",
      valid: true,
      loadingRestaurantType: false,
      loadingDepartment: false,
      loadingMunicipality: false,
      restaurantTypeList: [],
      departmentList: [],
      municipalityList: [],
      errorsBags: [],
      displayed: true,
      selectedImages: [],
      form: {
        id: "",
        name: "",
        restaurant_type_id: "",
        department_id: "",
        municipality_id: "",
        description: "",
        logo: null,
        cover: null,
        phone_2: "",
        enabled: true,
        images_id: [],
        cover_image: [],
      },
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
      getRestaurantTypeData: "restaurantType/getRestaurantTypeData",
      getDepartmentsData: "department/getDepartmentsData",
      getMunicipalitiesData: "municipality/getMunicipalitiesData",
      createImage: "image/createImage",
    }),
    onFileSelected(file) {
      console.log("event", file);
      this.selectedImages = file;
    },
    // preparedDataFiles() {
    //   this.$refs.form.validate();
    //   if (this.$refs.form.validate()) {
    //     if (this.selectedImages.length) {
    //       const payload = new FormData();
    //       this.selectedImages.forEach((e) => {
    //         payload.append("logo", e);
    //       });
    //       this.createImagenes(payload);
    //     } else {
    //       this.save();
    //     }
    //   }
    // },
    createImagenes(payload) {
      this.createImage(payload)
        .then((result) => {
          if (result) {
            this.form.logo = result[0].id;
            this.form.images_id.push(result[0].id);
            if (result.length == 2) {
              this.form.cover = result[1].id;
              this.form.cover_image.push(result[1].id);
            }
            // result.forEach((e) => {
            //   this.form.logo = e.id;
            //   this.form.images_id.push(e.id);
            // });

            this.selectedImages = [];

            this.displayed = false;
            this.$nextTick(() => {
              this.displayed = true;
            });

            // this.save();
            if (this.id) {
              this.update(this.form);
            } else {
              this.create(this.form);
            }

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
    deleteImagen() {
      this.form.logo = null;
      this.form.cover = null;
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        if (this.selectedImages.length) {
          const payload = new FormData();
          this.selectedImages.forEach((e) => {
            payload.append("images[]", e);
          });
          this.createImagenes(payload);
        } else {
          if (this.id) {
            this.update(payload);
          } else {
            this.create(payload);
          }
        }
      }
    },
    setData() {
      this.loadingRestaurantType = true;
      this.loadingDepartment = true;
      this.loadingMunicipality = true;
      // const departments = [];
      // const municipalities = [];
      // const restaurantTypes = [];
      const departments = [];
      const municipalities = [];
      const restaurantTypes = [];
      this.getRestaurantTypeData().then((result) => {
        result.map((element) => {
          restaurantTypes.push({
            value: element.id,
            text: element.name,
          });
          this.restaurantTypeList = restaurantTypes;
        });
        this.loadingRestaurantType = false;
      });
      this.getDepartmentsData().then((result) => {
        result.map((element) => {
          departments.push({
            value: element.id,
            text: element.name,
          });
          this.departmentList = departments;
        });
        this.loadingDepartment = false;
      });
      this.getMunicipalitiesData().then((result) => {
        result.map((element) => {
          municipalities.push({
            value: element.id,
            text: element.name,
          });
          this.municipalityList = municipalities;
        });
        this.loadingMunicipality = false;
      });
      if (this.id) {
        this.getRestaurantById(this.id).then((result) => {
          console.log(result);
          this.form = Object.assign(
            {
              images_id: result.logo,
              imagenes: result.logo,
            },
            result
          );
          // this.form.images_id = [
          //   {imagen: 'http://127.0.0.1:8088/1627314178.Zeincola.jpg'}
          // ];
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

<style scoped>
.error {
  color: #fff;
}
</style>
