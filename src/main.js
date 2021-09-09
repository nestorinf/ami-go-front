import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store";
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";
import * as VueGoogleMaps from "vue2-google-maps";
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAJPZI_2z4PMidmCZlztC1yyPc6SA-XTZ0",
    libraries: "places",
  },
});

Vue.use(VuetifyGoogleAutocomplete, {
  /*
    not used as loaded with component
    apiKey: key,
  */
  vueGoogleMapsCompatibility: true,
});

Vue.use(VueSkycons, {
  color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.config.productionTip = false;
Vue.use(Vuebar);


new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
});

