<template>
  <v-col cols="12" lg="12">
    <div>
      <h2>Busque una Dirección y agregue</h2>
      <GmapAutocomplete
        @place_changed='setPlace'
        :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
      />
      <button
        @click='addMarker'
      >
        Agregar
      </button>
    </div>
    <br>
    <GmapMap
      :center='center'
      :zoom='13'
      style='width:100%;  height: 400px;'
      @click=updateCoordinates
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
  data() {
    return {
      center: { lat: 13.6915591, lng: -89.2502712 },
      currentPlace: null,
      markers: [],
      places: [],
    }
  },
  mounted() {
    //this.geolocate();
  },
  methods: {
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
           
    },
    addMarker() {
    this.markers = []
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
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