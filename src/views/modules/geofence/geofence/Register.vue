<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        GeoCerca
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas GeoCercas
      </h6>
    </v-card-text>    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>   
                <v-col cols="12" lg="6">
                    <v-select
                    :loading="loadingDepartments"
                    label="Departamento"
                    :items="departmentList"
                    v-model="form.department_id"
                    filled
                    required
                    :rules="rules.departmentRule"
                    background-color="transparent"
                    :error-messages="errorsBags.department"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="6">
                    <v-select
                    :loading="loadingMunicipalities"
                    label="Municipio"
                    :items="municipalityList"
                    v-model="form.municipality_id"
                    filled
                    required
                    :rules="rules.municipalityRule"
                    background-color="transparent"
                    :error-messages="errorsBags.municipality"
                    ></v-select>
                </v-col>
                <v-col cols="12" lg="12">
                    <v-text-field
                    v-model="form.name"
                    label="Nombre"
                    required
                    filled
                    :rules="rules.nameRule"
                    background-color="transparent"
                    :error-messages="errorsBags.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" lg="12">
                    <GoogleMapGeoFence
                    v-if="loadingChild"
                    :title="'Titulo Marcador'"
                    @geofences="geofences"/> 
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
          to="/geofence/geofence"
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
import GoogleMapGeoFence from "../../../components/GoogleMapGeoFence";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "RegisterGeofence",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    GoogleMapGeoFence,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Dirección Comercio",
      valid: true,
      errorsBags: [],
      loadingDepartments: false,
      loadingMunicipalities: false,
      loadingChild: false,
      departmentList: [],
      municipalityList: [],
      editCoordinates:{},
      center:{},
      form: {
        id: "",
        department_id: null,
        municipality_id: null,
        name: "",
        geofence: []
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        departmentRule: [(v) => !!v || "este campo es obligatorio"],
        municipalityRule: [(v) => !!v || "este campo es obligatorio"]
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ storeGeofences: "geofence/getGeofences" }),
  },
  methods: {
    ...mapActions({
      createGeofence: "geofence/createGeofence",
      getGeofenceById: "geofence/getGeofenceById",
      updateGeofence: "geofence/updateGeofence",
      getDepartmentsData: "department/getDepartmentsData",
      getMunicipalitiesData: "municipality/getMunicipalitiesData",
    }),
    geofences(geofences){
      console.log('hhhh',geofences)
      this.form.geofence = geofences[0]
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
      this.loadingDepartments = true;       
      this.loadingMunicipalities = true;       
      const departments = [];
      const municipalities = [];      
      this.getDepartmentsData().then((result) => {
        this.loadingChild = true;        
        if(result) {   
          result.map((element) => {
            departments.push({
              value: element.id,
              text: element.name,
            });
            this.departmentList = departments;
            
          });

        }
        this.loadingDepartments = false;
      }).catch((err) => {
        console.log(err)
        this.loadingDepartments = false; 
      });
      this.getMunicipalitiesData().then((result) => {
        this.loadingChild = true;        
        if(result) {   
          result.map((element) => {
            municipalities.push({
              value: element.id,
              text: element.name,
            });
            this.municipalityList = municipalities;
            
          });

        }
        this.loadingMunicipalities = false;
      }).catch((err) => {
        console.log(err)
        this.loadingMunicipalities = false; 
      });
      if (this.id) {
        this.getGeofenceById(this.id).then((result) => {
           this.loadingChild = true;
          this.form = {
            id: result.id,
            name: result.name,
            department_id: result.department_id,
            municipality_id: result.municipality_id,
            geofence: result.geofence
          };
          this.editCoordinates = {
            lat:result.latitude,
            lng:result.longitude
          }
        });
        
      }          
    },

    create(payload) {
      this.createGeofence(payload)
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
      this.updateGeofence(payload)
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