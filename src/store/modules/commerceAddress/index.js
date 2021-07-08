import CommerceAddressService from "@/services/commerceAddress";

const state = {
  commerceAddresses: [],
  commerceAddress: {},
};

const mutations = {
  setCommerceAddresses(state, commerceAddresses) {
    state.commerceAddresses = commerceAddresses;
  },
  setCommerceAddress(state, commerceAddress) {
    state.commerceAddress = commerceAddress;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getCommerceAddressData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceAddressService.all()
        .then(({ data }) => {
          const commerceAddress = data.payload;

          commit("setCommerceAddresses", commerceAddress);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceAddresses", []);
        });
    });
  },

  getCommerceAddressById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceAddressService.getById(id)
        .then(({ data }) => {
          const commerceAddress = data.payload;

          commit("setCommerceAddress", commerceAddress);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceAddress", {});
        });
    });
  },

  createCommerceAddress({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceAddressService.create(body)
        .then(({ data }) => {
          const commerceAddress = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCommerceAddress", commerceAddress);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceAddresses", {});
        });
    });
  },
  updateCommerceAddress({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceAddressService.update(body)
        .then(({ data }) => {
          const commerceAddress = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCommerceAddress", commerceAddress);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceAddresses", {});
        });
    });
  },

  removeCommerceAddress({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceAddressService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.commerceAddresses.findIndex((x) => x.id === id);
          const commerceAddresses = [...state.commerceAddresses];
          commerceAddresses.splice(index, 1);

          commit("setCommerceAddresses", commerceAddresses);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          // commit('setCommerceTypess', {})
        });
    });
  },
};
const getters = {
  getCommerceAddresses: (state) => {
    return state.commerceAddresses;
  },
  getCommerceAddress: (state) => {
    return state.commerceAddress;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
