<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Dirección Restaurante
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las direcciones de restaurant
      </h6>
    </v-card-text>    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>   
                <v-col cols="12" lg="12">
                    <v-select
                    :loading="loadingRestaurants"
                    label="Restaurante"
                    :items="restaurantList"
                    v-model="form.restaurant_id"
                    filled
                    required
                    :rules="rules.restaurantRule"
                    background-color="transparent"
                    :error-messages="errorsBags.restaurant"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="12">
                    <v-text-field
                    v-model="form.name"
                    label="Dirección"
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
                    :editCoordinates="editCoordinates"/> 
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
          to="/restaurant/restaurant-address"
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
import GoogleMap from "../../../components/GoogleMap";
export default {
  name: "RegisterRestaurantAddress",
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
      titleForm: "Dirección Restaurante",
      valid: true,
      errorsBags: [],
      loadingRestaurants: false,
      loadingChild: false,
      restaurantList: [],
      editCoordinates:{},
      center:{},
      form: {
        id: "",
        restaurant_id: null,
        name: "",
        latitude: 0,
        longitude: 0,
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        restaurantRule: [(v) => !!v || "este campo es obligatorio"]
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    getRestaurantAddresses() {
      return this.$store.state.restaurantAddress.restaurantAddresses;
    },
  },

  methods: {
    ...mapActions({
      createRestaurantAddress: "restaurantAddress/createRestaurantAddress",
      getRestaurantAddressById: "restaurantAddress/getRestaurantAddressById",
      updateRestaurantAddress: "restaurantAddress/updateRestaurantAddress",
      getRestaurantsData: "restaurant/getRestaurantsData",
    }),
    coordinates(coordinate){
      this.form.latitude = coordinate.lat
      this.form.longitude = coordinate.lng
    },
    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        const payload = this.form;
        console.log(payload)
        if (this.id) {
          this.update(payload);
        } else {
          this.create(payload);
        }
      }
    },
    setData() {
      this.loadingRestaurants = true;       
      const rows = [];
      this.getRestaurantsData().then((result) => {
         this.loadingChild = true;
        if(result) {
          console.log(result)
          result.map((element) => {
            rows.push({
              value: element.id,
              text: element.description,
            });
            this.restaurantList = rows;
            
          });

        }
        this.loadingRestaurants = false;
      }).catch((err) => {
        console.log(err)
        this.loadingRestaurants = false; 
      });
      if (this.id) {
        this.getRestaurantAddressById(this.id).then((result) => {
           this.loadingChild = true;
          this.form = {
            id: result.id,
            name: result.name,
            restaurant_id: result.restaurant_id,
            latitude: result.latitude,
            longitude: result.longitude
          };
          this.editCoordinates = {
            lat:result.latitude,
            lng:result.longitude
          }
        });
        
      }          
    },

    create(payload) {
      this.createRestaurantAddress(payload)
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
      this.updateRestaurantAddress(payload)
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