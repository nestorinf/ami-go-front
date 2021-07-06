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
    <h1>{{editCoordinates}}</h1>
   </v-col>
</template>

<script>
export default {
  name: 'GoogleMap',
  props:{
   editCoordinates: Object
  },  
  data() {

  //   if (this.editCoordinates) {
  //     this.markers = []
  //       const coordinate = {
  //       lat: this.editCoordinates.lat,
  //       lng: this.editCoordinates.lng,
  //   }
  //   console.log(coordinate)
  //   this.markers.push({ position: coordinate });
  // }
 
    return {
      center: { lat: 13.6915591, lng: -89.2502712 },
      currentPlace: null,
      markers: [
        {
          position: {lat:parseFloat(this.editCoordinates.lat), lng:parseFloat(this.editCoordinates.lng)}
        }
      ],
      places: [],
    }
  },
  mounted() {    
    this.Coordinates()
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
    // console.log(coordinate)
    this.markers.push({ position: coordinate });
    this.$emit("coordinates", coordinate)
           
    },
    addMarker() {
    this.markers = []
      if (this.currentPlace) {
        const coordinate = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: coordinate });
        this.places.push(this.currentPlace);
        this.center = coordinate;
        this.currentPlace = null;
        this.$emit("coordinates", coordinate)
      }
    },
    Coordinates() {
      this.markers = []        
          const coordinateedit = {
            lat: this.editCoordinates.lat,
            lng: this.editCoordinates.lng,
          }
        console.log('entro')
        console.log(this.editCoordinates)
    this.markers.push({ position: coordinateedit })
    }
    // this.markers.push({ position: coordinate });
    // }
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