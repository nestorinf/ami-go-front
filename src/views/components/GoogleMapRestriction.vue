<template>
  <v-col cols="12" lg="12">
    <div>
      <h2>Busque una Dirección y Agregue O Seleccione en el Mapa</h2>
        <!-- <vuetify-google-autocomplete
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
        > -->
    </div>
    <br>
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
          :options = optionsCoberages
      >
      </gmapPolygon>

     <gmapPolygon
          :key="index + 1000"
          v-for="(m, index) in pathsregisteredRestrictions" 
          :paths="m.value"
          :editable="false"
          :draggable="false"
          :options = optionsRegisteredRestrictions
        >
      </gmapPolygon>

      <gmapPolygon
            :key="index + 2000"
            v-for="(m, index) in pathsRestrictions" 
            :paths="m.value"
            :editable="true"
            :draggable="true"
            @paths_changed="updateGeofence($event)"
            :options = optionsRestrictions
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
    editRestrictions: Array,
    geofence: Array,
    registeredRestrictions: Array
  }, 
  
  data() { 
    return {
      optionsCoberages: {
        strokeColor: "#2ECDFA",
        // strokeOpacity: 0.5,
        strokeWeight: 1.5,
        fillColor: "#2ECDFA",
        // fillOpacity: 0.20,
      },
      optionsRegisteredRestrictions: {
        strokeColor: "#F0453A",
        // strokeOpacity: 0.5,
        strokeWeight: 1.5,
        fillColor: "#F0453A",
        // fillOpacity: 0.20,
      },
      optionsRestrictions: {
        strokeColor: "#EB6B06",
        // strokeOpacity: 0.5,
        strokeWeight: 1.5,
        fillColor: "#EB6B06",
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
      pathsRestrictions: [],
      pathsregisteredRestrictions: [],
      pathsCoverages: [],
      disabledButton: true
    }
    
  },
  mounted()  { 
      this.Restrictions()
  },
  computed: {
   ...mapGetters({ storeCountries: "country/getCountries" })    
  },
  watch: {
    geofence(newValor){
      this.center = {
          lat: newValor[0].value[1].lat, 
          lng: newValor[0].value[1].lng,
          country: this.center.code,
          zoom: 14,
      }  
      this.pathsCoverages = newValor
      this.pathsRestrictions.push({
        value: this.generateRandomPoints(this.center, 400, 3)
      })       
    },
    registeredRestrictions(newValor){       
      this.pathsregisteredRestrictions = newValor
      // this.pathsregisteredRestrictions.push({
      //   value: this.
      // })       
    },
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
        let restrictions = this.polygonPaths()[0];
        this.$emit("restrictions", restrictions)
    },
    addMarker() {
    this.pathsRestrictions = []
      if (Object.keys(this.address).length != 0) {
        const coordinate = {
          lat: this.address.latitude,
          lng: this.address.longitude,
          country: this.center.country,
          zoom: 14
        };   
        this.center = coordinate;     
        this.pathsRestrictions = this.generateRandomPoints(coordinate, 1500, 3);
        this.$emit("restrictions",  this.paths)
       
      }
      
     },
    Restrictions() {
      this.pathsRestrictions = []        
      this.getCountryData().then((result => {
        const country = result.filter(country =>  country.is_default === 1  );    
       if(this.editRestrictions.length ) {
          this.center = {
            lat: this.editRestrictions[0].value[1].lat, 
            lng: this.editRestrictions[0].value[1].lng,
            country: country[0].code,
            zoom: 14,
         }  
          this.pathsRestrictions = this.editRestrictions
          this.$emit("restictions", this.pathsRestrictions)
      } else {
         this.center = {
            lat: parseFloat(country[0].latitude), 
            lng: parseFloat(country[0].longitude),
            country: country[0].code,
            zoom: 13,
         }
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