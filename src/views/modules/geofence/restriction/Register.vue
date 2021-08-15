<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        Restricciones
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se registran todas las restricciones sobre una zona de cobertura
      </h6>
    </v-card-text>    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>   
                <v-col cols="12" lg="6">
                    <v-select  
                    @change="loadMunicipalityByDepartment"                  
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
                    @change="loadGeofenceByDepartmentMunicipality"
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
                    <v-select
                     @change="Geofence"
                    :loading="loadingGeofences"
                    label="Zona de Cobertura"
                    :items="geofenceList"
                    v-model="form.geofence_id"
                    filled
                    required
                    :rules="rules.geofenceRule"
                    background-color="transparent"
                    :error-messages="errorsBags.geofence"
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
                    <GoogleMapRestriction
                    v-if="loadingChildRegister || loadingChildEdit"
                    :title="'Titulo Marcador'"
                    @restrictions="restrictions"
                    :editRestrictions="editRestrictions"
                    :geofence="geofence"
                    :registeredRestrictions="registeredRestrictions"/>
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
          to="/geofence/restriction"
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
import GoogleMapRestriction from "../../../components/GoogleMapRestriction";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "RegisterGeofenceRestriction",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    GoogleMapRestriction,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "Restricciones",
      valid: true,
      errorsBags: [],
      loadingDepartments: false,
      loadingMunicipalities: false,
      loadingGeofences: false,
      loadingChildRegister: false,
      loadingChildEdit: false,
      departmentList: [],
      municipalityList: [],
      geofenceList: [],
      restrictionList: [],
      editRestrictions:[],
      geofence:[],
      registeredRestrictions:[],
      center:{},
      reset:false,
      form: {
        id: "",
        department_id: null,
        municipality_id: null,
        geofence_id: null,
        name: "",
        restriction: []
      },

      rules: {
        nameRule: [(v) => !!v || "este campo es obligatorio"],
        departmentRule: [(v) => !!v || "este campo es obligatorio"],
        municipalityRule: [(v) => !!v || "este campo es obligatorio"],
        restrictionRule: [(v) => !!v || "este campo es obligatorio"]
      },
    };
  },

  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ storeGeofenceRestrictions: "geofenceRestriction/getGeofenceRestrictions" }),
  },
  methods: {
    ...mapActions({
      createGeofenceRestriction: "geofenceRestriction/createGeofenceRestriction",
      getGeofenceRestrictionById: "geofenceRestriction/getGeofenceRestrictionById",
      updateGeofenceRestriction: "geofenceRestriction/updateGeofenceRestriction",
      getDepartmentsData: "department/getDepartmentsData",
      getMunicipalityByDepartment: "municipality/getMunicipalityByDepartment",
      getGeofenceByDepartmentMunicipality: "geofence/getGeofenceByDepartmentMunicipality",
      getGeofenceRestrictionsByGeofence: "geofenceRestriction/getGeofenceRestrictionsByGeofence",
    }),
    
    setData() {
      this.loadingDepartments = true;       
      this.loadingMunicipalities = true;       
      this.loadingGeofences = true;       
      const departments = [];            
      this.getDepartmentsData().then((result) => {
        // this.loadingChild = true;        
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
        this.loadingMunicipalities = false;       
        this.loadingGeofences = false; 
      }).catch((err) => {
        console.log(err)
        this.loadingDepartments = false;
        this.loadingMunicipalities = false;       
        this.loadingGeofences = false; 

      });
      if (this.id) {
        this.getGeofenceRestrictionById(this.id).then((result) => {
          const parseData = {
            id: result.id,
            name: result.name,
            department_id: result.department_id,
            municipality_id: result.municipality_id,
            geofence_id: result.geofence_id,
            restriction: result.restriction
          };

          this.editRestrictions.push({
            value: result.restriction
          })

          this.form = Object.assign({}, parseData);

          this.loadMunicipalityByDepartment();

          this.loadGeofenceByDepartmentMunicipality(); 

            this.loadingChildEdit = true;
          this.loadGeofenceRestrictionsByGeofence();

          
             
        })        
      }  else {this.loadingChildRegister = true}
         
    },

    Geofence() {
      this.geofence = []
      const pathgeofence = this.geofenceList.filter(geofence =>  geofence.value === this.form.geofence_id);
      this.geofence.push({
      value:pathgeofence[0].geofence
      })
        
      this.loadGeofenceRestrictionsByGeofence();
    },

    loadMunicipalityByDepartment() {
      this.loadingMunicipalities = true;
      const municipalities = []
      this.municipalityList = [];
      this.geofenceList = [];
      this.getMunicipalityByDepartment(this.form.department_id)
        .then((result) => {
          if (result) {
              result.map((element) => {
              municipalities.push({
              value: element.id,
              text: element.name,
            });
            this.municipalityList = municipalities;
            
          });             
          }
          this.loadingMunicipalities = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingMunicipalities = false;
        });
    },

    loadGeofenceByDepartmentMunicipality() {
      this.loadingGeofences = true;
      const geofences = [];  
      this.geofenceList = [];
      this.getGeofenceByDepartmentMunicipality({department_id:this.form.department_id, municipality_id:this.form.municipality_id})
        .then((result) => {
          if (result) {
            result.map((element) => {
            geofences.push({
              value: element.id,
              text: element.name,
              geofence: element.geofence,
            });
            this.geofenceList = geofences;
            
          });
          }
          this.loadingGeofences = false;

          this.geofence = []
            const pathgeofence = this.geofenceList.filter(geofence =>  geofence.value === this.form.geofence_id);
            this.geofence.push({
            value:pathgeofence[0].geofence
            })
            
        })
        .catch((err) => {
          console.log(err);
          this.loadingGeofences = false;
        });         
    },

    loadGeofenceRestrictionsByGeofence(){
        this.getGeofenceRestrictionsByGeofence(this.form.geofence_id).then((result) => {  
            this.restrictionList = []             
            if(result) {   
            result.map((element) => {
                this.restrictionList.push({
                value: element.id,
                text: element.name,
                geofence_id: element.geofence_id,
                restriction: element.restriction,
                });          
            });
            
            this.registeredRestrictions = []
            const pathregisteredRestrictions = this.restrictionList.filter(restriction => restriction.value != this.id) 
                pathregisteredRestrictions.map((element) => {
                this.registeredRestrictions.push({
                    value:element.restriction
                })
                });            
            } 
        this.loadingChildRegister = true;                                 
        }).catch((err) => {
            console.log(err)        
        });
    },
    restrictions(restrictions){
      this.form.restriction = restrictions
    },
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

    create(payload) {
      this.createGeofenceRestriction(payload)
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
      this.updateGeofenceRestriction(payload)
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