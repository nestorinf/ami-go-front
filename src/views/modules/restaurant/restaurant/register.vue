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
          <v-col cols="6" lg="6">
            <label for="logo">Logo</label>
            <ShowsImages
              :items="imagesListLogo"
              v-if="true"
              @delete-imagen="deleteImagenLogo"
            ></ShowsImages>
            <UploadImages
              style="height: auto"
              ref="VueUploadImageLogo"
              v-model="form.logo"
              v-if="displayedLogo"
              :max="1"
              @changed="handleImageLogo"
            />
          </v-col>

          <v-col cols="6" lg="6">
            <label for="cover">Cover</label>
            <ShowsImages
              :items="imagesListCover"
              v-if="true"
              @delete-imagen="deleteImagenCover"
            ></ShowsImages>

            <UploadImages
              style="height: auto"
              ref="VueUploadImagesCover"
              v-model="form.cover"
              v-if="displayedCover"
              :max="1"
              @changed="handleImageCover"
            />
          </v-col>
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
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      getRestaurant: "restaurant/getRestaurant",
    }),
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
      imagesListLogo: [],
      imagesListCover: [],
      displayedLogo: true,
      displayedCover: true,
      form: {
        id: "",
        name: "",
        restaurant_type_id: "",
        department_id: "",
        municipality_id: "",
        description: "",
        phone: "",
        phone_2: "",
        enabled: true,
        logo: [],
        cover: [],
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
      removeAttachment: "commerceType/removeAttachment",
    }),
    save() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("id", this.id);

        formData.append("restaurant_type_id", this.form.restaurant_type_id);
        formData.append("name", this.form.name);
        formData.append("department_id", this.form.department_id);
        formData.append("municipality_id", this.form.municipality_id);
        formData.append("description", this.form.description);
        formData.append("phone", this.form.phone);
        formData.append("phone_2", this.form.phone_2);
        formData.append("enabled", this.form.enabled);

        for (let i = 0; i < this.form.logo.length; i++) {
          let file = this.form.logo[i];
          formData.append("logo[" + i + "]", file);
        }
        for (let e = 0; e < this.form.cover.length; e++) {
          let file = this.form.cover[e];
          formData.append("cover[" + e + "]", file);
        }

        if (this.id) {
          formData.append("_method", "PUT");
          this.update(formData, this.id);
        } else {
          this.create(formData);
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
          this.form = Object.assign(
            {
              logo: [],
              cover: [],
            },
            result
          );
        });
      }
    },
    attachments(attachmentData) {
      const attachmentsRows = [];
      if (this.id) {
        attachmentData.map((element) => {
          if (element) {
            attachmentsRows.push({
              id: element.id,
              imagen: element.url,
            });
          }
        });
      }

      return attachmentsRows;
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

    update(payload, id) {
      this.updateRestaurant({ payload, id })
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
    handleImageLogo(event) {
      this.form.logo = event;
    },
    handleImageCover(event) {
      this.form.cover = event;
    },

    deleteImagenLogo(id) {
      const index = this.imagesListLogo.findIndex((x) => x.id === id);
      const attachments = [...this.imagesListLogo];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesListLogo = attachments;
        }
      });
    },
    deleteImagenCover(id) {
      const index = this.imagesListCover.findIndex((x) => x.id === id);
      const attachments = [...this.imagesListCover];
      attachments.splice(index, 1);

      this.removeAttachment(id).then((response) => {
        if (response) {
          this.imagesListCover = attachments;
        }
      });
    },
  },
  watch: {
    getRestaurant(data) {
      data.attachment.map((element) => {
        if (element.column == "logo") {
          this.imagesListLogo = this.attachments([element]);
        } else {
          this.imagesListCover = this.attachments([element]);
        }
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: #fff;
}
.resource-image-box {
  display: flex;
}
.resource-image {
  height: 8rem;
  width: 8rem;
  margin: 0 0.5rem;
}
</style>
