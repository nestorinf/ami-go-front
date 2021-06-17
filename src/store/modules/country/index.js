import CountryService from "@/services/country";

const state = {
  countries: [],
  country: {},
};

const mutations = {
  setCountries(state, countries) {
    state.countries = countries;
  },
  setCountry(state, countries) {
    state.countries = countries;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getCountryData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CountryService.all()
        .then(({ data }) => {
          const country = data.payload;

          commit("setCountries", country);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountries", []);
        });
    });
  },

  getCountryById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CountryService.getById(id)
        .then(({ data }) => {
          const country = data.payload;

          commit("setCountry", country);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountry", {});
        });
    });
  },

  createCountry({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CountryService.create(body)
        .then(({ data }) => {
          const country = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountry", country);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountries", {});
        });
    });
  },
  updateCountry({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CountryService.update(body)
        .then(({ data }) => {
          const country = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountry", country);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCountries", {});
        });
    });
  },

  removeCountry({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CountryService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.countries.findIndex((x) => x.id === id);
          const countries = [...state.countries];
          countries.splice(index, 1);

          commit("setCountries", countries);

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
  getCountries: (state) => {
    return state.countries;
  },
  getCountry: (state) => {
    return state.country;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
