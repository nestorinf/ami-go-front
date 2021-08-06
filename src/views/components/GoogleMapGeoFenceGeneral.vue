<template>
  <v-col cols="12" lg="12">
     <GmapMap
      :center='this.center'
      :zoom='this.center.zoom'
      style='width:100%;  height: 400px;'
    >
     <gmapPolygon
          :key="index"
          v-for="(m, index) in pathsCoverages"          
          :paths="m.value"
          :editable="false"
          :draggable="false"
          :title="'Titulo Marcador'"
          :options = optionsCoberages
        >
      </gmapPolygon>

      <gmapPolygon
          :key="index + 100"
          v-for="(m, index) in pathsRestrictions"          
          :paths="m.value"
          :editable="false"
          :draggable="false"
          :title="'Titulo Marcador'"
          :options = optionsRestrictions
        >
      </gmapPolygon>
    </GmapMap>
   </v-col>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
export default {
  name: 'GoogleMapGeoFenceGeneral',  
  props:{
    geofencesList: Array,
  }, 
  
  data() { 
    return {
      optionsCoberages: {
        strokeColor: "#2ECDFA",
        // strokeOpacity: 0.5,
        // strokeWeight: 1,
        fillColor: "#2ECDFA",
        // fillOpacity: 0.20,
      },
      optionsRestrictions: {
        strokeColor: "#F0453A",
        // strokeOpacity: 0.5,
        // strokeWeight: 1,
        fillColor: "#F0453A",
        // fillOpacity: 0.20,
      },
      center: { lat:0.00, lng: 0.00 },
      polygonGeojson: "",
      mvcPaths: null,
      // center: { lat: 1.39, lng: 103.81 },
      pathsCoverages: [],
      pathsRestrictions: [],
      disabledButton: true
    }
    
  },
  mounted()  { 
      this.Coordinates()
  },
  computed: {
   ...mapGetters({ storeCountries: "country/getCountries" }),
    
    },
  methods: {
    ...mapActions({
      getCountryData: "country/getCountryData",
    }),

    Coordinates() {
      this.paths = []        
      this.getCountryData().then((result => {
        const country = result.filter(country =>  country.is_default === 1  );  
        this.center = {
            lat: parseFloat(country[0].latitude), 
            lng: parseFloat(country[0].longitude),
            country: country[0].code,
            zoom: 13,
         }   
       if(this.geofencesList.length ) {
           
          this.pathsCoverages = this.geofencesList, 

          this.pathsRestrictions.push({
              value: [{"lat": 13.705062770630516, "lng": -89.24611161379748}, {"lat": 13.70961342227527, "lng": -89.24949904510143}, {"lat": 13.707741359763569, "lng": -89.23425966410696}],
            });
      }      
      }))
    },    
    //geolocate: function() {
    //  navigator.geolocation.getCurrentPosition(position => {
    //    this.center = {
    //      lat: position.coords.latitude,
    //      lng: position.coords.longitude,
    //    };

    //  const marker = {
    //    lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };

    //    this.markers.push({ position: marker });
    //  });      
    //},
  },
};
</script>