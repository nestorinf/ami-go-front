<template>
  <v-card class="mb-7">
      <v-card-text class="pa-5 border-bottom">
      <h3 class="title blue-grey--text text--darken-2 font-weight-regular">
        GeoCerca General
      </h3>
      <h6 class="subtitle-2 font-weight-light">
        En este formulario se muestran todas GeoCercas Registradas
      </h6>
    </v-card-text>    
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>              
                <v-col cols="12" lg="12">
                    <GoogleMapGeoFenceGeneral
                    v-if="loadingChild"
                    :title="'Titulo Marcador'"
                    :geofenceList="geofenceList"
                    :geofenceRestrictionList="geofenceRestrictionList"/>
                </v-col>
              </v-row>
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
import GoogleMapGeoFenceGeneral from "../../../components/GoogleMapGeoFenceGeneral";
import { mapActions,mapGetters } from "vuex";
export default {
  name: "RegisterGeofence",
  props: {
    id: String,
  },
  components: {
    SnackBar,
    GoogleMapGeoFenceGeneral,
  },

  data() {
    return {
      textSnackBar: "",
      titleForm: "GeoCercas",
      valid: true,
      errorsBags: [],
      loadingChild: false,
      geofenceList:[],
      geofenceRestrictionList:[],
    };
  },
  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters({ 
      storeGeofences: "geofence/getGeofences", 
      storeGeofenceRestrictions: "geofenceRestriction/getGeofenceRestrictions" 
    }),
  },
  methods: {
    ...mapActions({
      getGeofenceData: "geofence/getGeofenceData",
      getGeofenceRestrictionData: "geofenceRestriction/getGeofenceRestrictionData",
    }),
    setData() {
     this.geofenceList = []      
      this.getGeofenceData().then((result) => {
        this.loadingChild = true;        
        if(result) {  
          result.map((element) => {   
            this.geofenceList.push({
              value: element.geofence,
            });
          });  
         }  
      }).catch((err) => {
        console.log(err)
      });         
     this.geofenceRestrictionsList = []      
      this.getGeofenceRestrictionData().then((result) => {
        this.loadingChild = true;        
        if(result) {  
          result.map((element) => {   
            this.geofenceRestrictionList.push({
              value: element.restriction,
            });
          });  
         }  
      }).catch((err) => {
        console.log(err)
      });         
    },   
  },
};
</script>