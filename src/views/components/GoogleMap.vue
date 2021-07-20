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
      @click="updateCoordinates"      
    >
      <GmapMarker
        :draggable="true"
        :key="index"        
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
        @dragend="updateCoordinates"
      />
    </GmapMap>
   </v-col>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
export default {
  name: 'GoogleMap',  
  props:{
   editCoordinates: Object,
  }, 
  data() { 
    return {
       center: { lat:0.00, lng: 0.00 },
      currentPlace: null, 
      markers: [],
      places: [],
      address: '',
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
    
    getAddressData: function (addressData) {
                this.address = addressData;
            },
    setPlace(place) {
      this.currentPlace = place;
    },
    updateCoordinates(location) {
    this.markers = []
    const coordinate = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
    }
    this.markers.push({ position: coordinate });
    this.$emit("coordinates", coordinate)
    },
    addMarker() {
    this.markers = []
      if (this.address) {
        const coordinate = {
          lat: this.address.latitude,
          lng: this.address.longitude,
        };        
        this.markers.push({ position: coordinate });
        this.places.push(this.currentPlace);
        this.$emit("coordinates", coordinate)
        this.center = coordinate;
        this.currentPlace = null;
      }
      
    },
    Coordinates() {
      this.markers = []        
          const coordinateedit = {
            lat: parseFloat(this.editCoordinates.lat),
            lng: parseFloat(this.editCoordinates.lng),
          }
      this.markers.push({ position: coordinateedit });
      
      this.getCountryData().then((result => {
        const country = result.filter(country =>  country.is_default === 1  );
        
        this.center = {
        lat: parseFloat(country[0].latitude), 
        lng: parseFloat(country[0].longitude),
        country: country[0].code,
      }        
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