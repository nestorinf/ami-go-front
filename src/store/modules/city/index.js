import CityService from "@/services/city";

const state = {
  cities: [],
  city: {},
};

const mutations = {
  setCities(state, cities) {
    state.cities = cities;
  },
  setCity(state, cities) {
    state.cities = cities;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getCityData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CityService.all()
        .then(({ data }) => {
          const city = data.payload;
          commit("setCities", city);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCities", []);
        });
    });
  },

  getCityById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CityService.getById(id)
        .then(({ data }) => {
          const city = data.payload;

          commit("setCity", city);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCity", {});
        });
    });
  },

  createCity({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CityService.create(body)
        .then(({ data }) => {
          const city = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCity", city);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCities", {});
        });
    });
  },
  updateCity({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CityService.update(body)
        .then(({ data }) => {
          const city = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCity", city);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCities", {});
        });
    });
  },

  removeCity({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CityService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.cities.findIndex((x) => x.id === id);
          const cities = [...state.cities];
          cities.splice(index, 1);

          commit("setCities", cities);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          // commit('setCommerceTypess', {})
        });
    });
  },
};
const getters = {
  getCities: (state) => {
    return state.cities;
  },
  getCity: (state) => {
    return state.city;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
