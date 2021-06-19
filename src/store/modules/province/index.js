import ProvinceService from "@/services/province";

const state = {
  provinces: [],
  province: {},
};

const mutations = {
  setProvinces(state, provinces) {
    state.provinces = provinces;
  },
  setProvince(state, provinces) {
    state.provinces = provinces;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getProvinceData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProvinceService.all()
        .then(({ data }) => {
          const province = data.payload;
          commit("setProvinces", province);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvinces", []);
        });
    });
  },

  getProvinceById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProvinceService.getById(id)
        .then(({ data }) => {
          const province = data.payload;

          commit("setProvince", province);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvince", {});
        });
    });
  },

  createProvince({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProvinceService.create(body)
        .then(({ data }) => {
          const province = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvince", province);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvinces", {});
        });
    });
  },
  updateProvince({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProvinceService.update(body)
        .then(({ data }) => {
          const province = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvince", province);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setProvinces", {});
        });
    });
  },

  removeProvince({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProvinceService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.provinces.findIndex((x) => x.id === id);
          const provinces = [...state.provinces];
          provinces.splice(index, 1);

          commit("setProvinces", provinces);

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
  getProvinces: (state) => {
    return state.provinces;
  },
  getProvince: (state) => {
    return state.province;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
