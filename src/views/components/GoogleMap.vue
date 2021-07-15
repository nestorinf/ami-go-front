<template>
  <v-col cols="12" lg="12">
    <div>
      <h2>Busque una Dirección y Agregue</h2>
      <!-- <GmapAutocomplete
        @place_changed='setPlace'
        :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
      /> -->
      <vuetify-google-autocomplete
          id="map"
          placeholder="Ingrese una Direccion"
          @place_changed='setPlace'
          country="ve"
          v-on:placechanged="getAddressData">
      </vuetify-google-autocomplete>

      <!-- <v-text-field
            label="Ingrese una Direccion"
            v-on:changed="setPlace"
            :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
          ></v-text-field> -->
      <v-btn
          color="success"
          @click="addMarker"
          class="text-capitalize mr-2"
          >Agregar</v-btn
        >
    </div>
    <br>
    <GmapMap
      :center='center'
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

export default {
  name: 'GoogleMap',  
  props:{
   editCoordinates: Object,
   centerMap: Object
  }, 
  data() { 
    return {
      center: { lat:this.centerMap.lat, lng: this.centerMap.lng },
      currentPlace: null, 
      markers: [],
      places: [],
      address: '',
    }
  },
  mounted()  {    
    this.Coordinates()
  },
  methods: {
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