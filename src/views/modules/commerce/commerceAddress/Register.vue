<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Dirección Comercio
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
        En este formulario se registran todas las direcciones de comercio
      </h6>
    </v-card-text>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" lg="12">
            <v-select
              :loading="loadingCommerces"
              label="Comercio *"
              :items="commerceList"
              v-model="form.commerce_id"
              filled
              required
              :rules="rules.commerceRule"
              background-color="transparent"
              :error-messages="errorsBags.comerce"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="form.name"
              label="Dirección *"
              required
              filled
              :rules="rules.nameRule"
              background-color="transparent"
              :error-messages="errorsBags.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <GoogleMap
              v-if="loadingChild"
              @coordinates="coordinates"
              :title="'Titulo Marcador'"
              :editCoordinates="editCoordinates"
            />
          </v-col>
          <!-- <v-col cols="12" lg="12">
                    <GoogleMap
                    v-if="loadingChild"
                    @coordinates="coordinates"
                    :title="'Titulo Marcador'"
                    :editCoordinates="editCoordinates"/> 
                </v-col> -->
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
          to="/commerce/commerce-address"
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
import SnackBar from "@/views/modules/components/SnackBar";
import GoogleMap from "../../../components/GoogleMap";
import { mapActions } from "vuex";
export default {
  name: "RegisterCommerceAddress",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    GoogleMap,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Dirección Comercio",
      valid: true,
      errorsBags: [],
      loadingCommerces: false,
      loadingChild: false,
      commerceList: [],
      editCoordinates: {},
      center: {},
      form: {
        id: "",
        commerce_id: null,
        name: "",
        latitude: 0,
        longitude: 0,
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        commerceRule: [(v) => !!v || "este campo es obligatorio"],
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getComerceAddresses() {
      return this.$store.state.comerceAddress.comerceAddresses;
    },
  },
  methods: {
    ...mapActions({
      createCommerceAddress: "commerceAddress/createCommerceAddress",
      getCommerceAddressById: "commerceAddress/getCommerceAddressById",
      updateCommerceAddress: "commerceAddress/updateCommerceAddress",
      getCommercesData: "commerce/getCommercesData",
    }),
    coordinates(coordinate) {
      this.form.latitude = coordinate.lat;
      this.form.longitude = coordinate.lng;
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        console.log(payload);
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      this.loadingCommerces = true;
      const rows = [];
      this.getCommercesData()
        .then((result) => {
          this.loadingChild = true;
          if (result) {
            result.map((element) => {
              rows.push({
                value: element.id,
                text: element.name,
              });
              this.commerceList = rows;
            });
          }
          this.loadingCommerces = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCommerces = false;
        });
      if (this.id) {
        this.getCommerceAddressById(this.id).then((result) => {
          this.loadingChild = true;
          this.form = {
            id: result.id,
            name: result.name,
            commerce_id: result.commerce_id,
            latitude: result.latitude,
            longitude: result.longitude,
          };
          this.editCoordinates = {
            lat: result.latitude,
            lng: result.longitude,
          };
        });
      }
    },

    create(payload) {
      this.createCommerceAddress(payload)
        .then((result) => {
          if (result) {
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
      this.updateCommerceAddress(payload)
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