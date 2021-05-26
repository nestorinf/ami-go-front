import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "primary",
    setHorizontalLayout: false, // Horizontal layout
  },
  mutations: {
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },
  },
  actions: {},
  getters: {},
  modules: {}
});


// const loadStore = () => {
//   // const files =  path.join('../store/modules/auth/index.js')
//   // return require(files)
//   const files = require.context('./modules/', true, /\.js$/)
//   return files
  // console.log(files)
  // const context = require.context('./modules/**/', true, /index.js$/i)
  // return context.keys()
  //   .map(context)         // import module
  //   .map(m => m.default)
// }

// const loadStore = () => {
//   return readFileSync('./modules/**/index.js', { encoding: 'uft8' },(err,files)=>{
//     return files
//   })
// }
// const mg = glob('./modules/**/.js', {mark: true}, function (er, matches) {
//   console.log("matches", matches)
// })
const context = require.context('./modules/', true, /\.js$/i)
const contextFile = context.keys()
console.log(contextFile)
// fs.readdir(__dirname, (err, files) => {
//   if (err)
//     console.log(err);
//   else {
//     console.log("\nCurrent directory filenames:");
//     files.forEach(file => {
//       console.log(file);
//     })
//   }
// })
// console.log('->',loadStore())
