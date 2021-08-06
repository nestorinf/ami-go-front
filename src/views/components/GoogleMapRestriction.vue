<template>
  <v-col cols="12" lg="12">
    <div>
      <h2>Busque una Dirección y Agregue O Seleccione en el Mapa</h2>
        <vuetify-google-autocomplete
          id="map"
          placeholder="Ingrese una Direccion"
          :country="''+this.center.country+''"
          v-on:placechanged="getAddressData">
      </vuetify-google-autocomplete>
      <v-btn
          color="success"
          @click="addMarker"
          class="text-capitalize mr-2"
          :disabled="disabledButton">
          Agregar</v-btn
        >
    </div>
    <br>
    <GmapMap
      :center='this.center'
      :zoom='this.center.zoom'
      style='width:100%;  height: 400px;'
    >
     <gmapPolygon
         :paths="paths"
          :editable="true"
          :draggable="true"
          @paths_changed="updateGeofence($event)"
          :options = this.options
        >
      </gmapPolygon>
    </GmapMap>
   </v-col>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
export default {
  name: 'GoogleMapGeoFence',  
  props:{
    editCoordinates: Array,
  }, 
  
  data() { 
    return {
      options: {
        strokeColor: "#F0453A",
        // strokeOpacity: 0.5,
        // strokeWeight: 1,
        fillColor: "#F0453A",
        // fillOpacity: 0.20,
      },
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

    polygonPaths: function () {
      if (!this.mvcPaths) return null;

      let paths = [];
      for (let i = 0; i < this.mvcPaths.getLength(); i++) {
        let path = [];
        for (let j = 0; j < this.mvcPaths.getAt(i).getLength(); j++) {
          let point = this.mvcPaths.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }

      return paths;
    },

    getAddressData(addressData) {
        this.address = addressData;
        this.disabledButton = false
    },    

    updateGeofence(mvcPaths) {     
        this.mvcPaths = mvcPaths;
        let geofences = this.polygonPaths()[0];
        this.$emit("geofences", geofences)
    },

    // readGeojson: function ($event) {
    //   try {
    //     this.polygonGeojson = $event.target.value;
    //     var v = JSON.parse($event.target.value);
    //     this.paths = v.coordinates.map((linearRing) =>
    //       linearRing
    //         .slice(0, linearRing.length - 1)
    //         .map(([lng, lat]) => ({ lat, lng }))
    //     );
    //     this.errorMessage = null;
    //   } catch (err) {
    //     this.errorMessage = err.message;
    //   }
    // },
    addMarker() {
    this.paths = []
      if (Object.keys(this.address).length != 0) {
        const coordinate = {
          lat: this.address.latitude,
          lng: this.address.longitude,
          country: this.center.country,
          zoom: 14
        };   
        this.center = coordinate;     
        this.paths = this.generateRandomPoints(coordinate, 1500, 3);
        this.$emit("geofences",  this.paths)
       
      }
      
     },
    Coordinates() {
      this.paths = []        
      this.getCountryData().then((result => {
        const country = result.filter(country =>  country.is_default === 1  );    
       if(this.editCoordinates.length ) {
          this.center = {
            lat: this.editCoordinates[0].lat, 
            lng: this.editCoordinates[0].lng,
            country: country[0].code,
            zoom: 14,
         }  
          this.paths = this.editCoordinates
          this.$emit("geofences", this.paths)
      } else {
         this.center = {
            lat: parseFloat(country[0].latitude), 
            lng: parseFloat(country[0].longitude),
            country: country[0].code,
            zoom: 13,
         }  
          this.paths = this.generateRandomPoints(this.center, 1500, 3);
      }      
      }))
    },
    generateRandomPoints(center, radius, count) {
        const points = [];
        for (let i=0; i<count; i++) {
          points.push(this.generateRandomPoint(center, radius, i));
        }
        return points;
    },

    generateRandomPoint(center, radius, position) {
      const LongApprox = [
        {u: 0.27945079641863235, v:0.6381595871038035},
        {u: 0.6179831600169181,  v:0.3893627369672137},
        {u: 0.26757332398611244, v:0.04421426938525319}
      ]

      let x0 = center.lng;
      let y0 = center.lat;
      let rd = radius/111300;

      //var u = Math.random();
      //var v = Math.random();
      let u = LongApprox[position].u
      let v = LongApprox[position].v

      let w = rd * Math.sqrt(u);
      let t = 2 * Math.PI * v;
      let x = w * Math.cos(t);
      let y = w * Math.sin(t);

      let xp = x/Math.cos(y0);
      // Resulting point.
      return {'lat': y+y0, 'lng': xp+x0};
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