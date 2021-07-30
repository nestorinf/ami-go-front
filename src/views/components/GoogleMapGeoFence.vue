<template>
  <v-col cols="12" lg="12">
    <div>
      <h2>Busque una Dirección y Agregue O Seleccione en el Mapa</h2>
        <vuetify-google-autocomplete
          id="map"
          placeholder="Ingrese una Direccion"
          @place_changed='setPlace'
          :country="''+this.center.country+''"
          v-on:placechanged="getAddressData">
      </vuetify-google-autocomplete>
      <v-btn
          color="success"
          @click="addMarker"
          class="text-capitalize mr-2"
          >Agregar</v-btn
        >
    </div>
    <br>
    <GmapMap
      :center='this.center'
      :zoom='13'
      style='width:100%;  height: 400px;'
    >
     <gmapPolygon
         :paths="paths"
          :editable="true"
          :draggable="true"
          @paths_changed="updateGeofence($event)"
        >
      </gmapPolygon>
      <!-- <GmapMarker
        :draggable="true"
        :key="index"        
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
        @dragend="updateCoordinates"
      /> -->
    </GmapMap>
   </v-col>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
export default {
  name: 'GoogleMapGeoFence',  
  props:{
  //  editCoordinates: Object,
  }, 
  data() { 
    return {
      center: { lat:0.00, lng: 0.00 },
      currentPlace: null, 
      markers: [],
      places: [],
      address: '',
      polygonGeojson: "",
      mvcPaths: null,
      // center: { lat: 1.39, lng: 103.81 },
      paths: [],
    }
    
  },
  mounted()  { 
      this.Coordinates()
  },
  computed: {
   ...mapGetters({ storeCountries: "country/getCountries" }),

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
    },
  methods: {
    ...mapActions({
      getCountryData: "country/getCountryData",
    }),  

    getAddressData: function (addressData) {
                this.address = addressData;
            },
    setPlace(place) {
      this.currentPlace = place;
    },
    
    updateGeofence: function (mvcPaths) {
      this.mvcPaths = mvcPaths;
      const geofences = this.polygonPaths;
      this.$emit("geofences", geofences)
    },

    readGeojson: function ($event) {
      try {
        this.polygonGeojson = $event.target.value;

        var v = JSON.parse($event.target.value);

        this.paths = v.coordinates.map((linearRing) =>
          linearRing
            .slice(0, linearRing.length - 1)
            .map(([lng, lat]) => ({ lat, lng }))
        );

        this.errorMessage = null;
      } catch (err) {
        this.errorMessage = err.message;
      }
    },

   generateRandomPoints(center, radius, count) {
        const points = [];
        for (let i=0; i<count; i++) {
          points.push(this.generateRandomPoint(center, radius, i));
        }
        return points;
    },

    generateRandomPoint(center, radius, position) {
      const LongTest = [
        {u: 0.27945079641863235, v:0.6381595871038035},
        {u: 0.6179831600169181,  v:0.3893627369672137},
        {u: 0.26757332398611244, v:0.04421426938525319}
      ]

      let x0 = center.lng;
      let y0 = center.lat;
      let rd = radius/111300;

      //var u = Math.random();
      //var v = Math.random();
      let u = LongTest[position].u
      let v = LongTest[position].v

      let w = rd * Math.sqrt(u);
      let t = 2 * Math.PI * v;
      let x = w * Math.cos(t);
      let y = w * Math.sin(t);

      let xp = x/Math.cos(y0);
      // Resulting point.
      return {'lat': y+y0, 'lng': xp+x0};
    },


    
    
    
    // getAddressData: function (addressData) {
    //             this.address = addressData;
    //         },
    // setPlace(place) {
    //   this.currentPlace = place;
    // },
    // updateCoordinates(location) {
    // this.markers = []
    // const coordinate = {
    //     lat: location.latLng.lat(),
    //     lng: location.latLng.lng(),
    // }
    // this.markers.push({ position: coordinate });
    // this.$emit("coordinates", coordinate)
    // },
    addMarker() {
      console.log('entro')
    this.paths = []
      if (this.address) {
        const coordinate = {
          lat: this.address.latitude,
          lng: this.address.longitude,
        };        
        this.paths = this.generateRandomPoints(coordinate, 1500, 3);
        this.places.push(this.currentPlace);
        console.log(this.paths)
        // this.$emit("geofences",  this.paths)
        this.center = coordinate;
        this.currentPlace = null;
      }
      
     },
    Coordinates() {
      // this.markers = []        
      //     const coordinateedit = {
      //       lat: parseFloat(this.editCoordinates.lat),
      //       lng: parseFloat(this.editCoordinates.lng),
      //     }
      // this.markers.push({ position: coordinateedit });
      
      this.getCountryData().then((result => {
        const country = result.filter(country =>  country.is_default === 1  );
        
        this.center = {
        lat: parseFloat(country[0].latitude), 
        lng: parseFloat(country[0].longitude),
        country: country[0].code,
      }    
      
      this.paths = this.generateRandomPoints(this.center, 1500, 3);


      // this.paths.push({ lat: 13.7013266, lng: -89.226622})
      // this.paths.push({ lat: 13.70432661, lng: -89.229622})
      // this.paths.push({ lat: 13.708827555540417, lng: -89.22478551318359})
      // this.paths.push({ lat: 13.701741606901281, lng: -89.22175554492188})

      
      }))
    }

    
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