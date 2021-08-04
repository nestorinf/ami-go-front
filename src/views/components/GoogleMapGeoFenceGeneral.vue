<template>
  <v-col cols="12" lg="12">
     <GmapMap
      :center='this.center'
      :zoom='this.center.zoom'
      style='width:100%;  height: 400px;'
    >
     <gmapPolygon
          :key="index"
          v-for="(m, index) in paths"          
          :paths="m.value"
          :editable="false"
          :draggable="false"
          :title="'Titulo Marcadorhhhhh'"
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
      center: { lat:0.00, lng: 0.00 },
      currentPlace: null, 
      markers: [],
      places: [],
      address: {},
      polygonGeojson: "",
      mvcPaths: null,
      // center: { lat: 1.39, lng: 103.81 },
      paths: [],
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
         console.log('geofencesList',this.geofencesList) 
       if(this.geofencesList.length ) {
           
          this.paths = this.geofencesList
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