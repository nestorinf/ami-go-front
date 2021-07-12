import RestaurantAddressService from "@/services/restaurantAddress";

const state = {
  restaurantAddresses: [],
  restaurantAddress: {},
};

const mutations = {
  setRestaurantAddresses(state, restaurantAddresses) {
    state.restaurantAddresses = restaurantAddresses;
  },
  setRestaurantAddress(state, restaurantAddress) {
    state.restaurantAddress = restaurantAddress;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getRestaurantAddressData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantAddressService.all()
        .then(({ data }) => {
          const restaurantAddress = data.payload;

          commit("setRestaurantAddresses", restaurantAddress);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setRestaurantAddresses", []);
        });
    });
  },

  getRestaurantAddressById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantAddressService.getById(id)
        .then(({ data }) => {
          const restaurantAddress = data.payload;

          commit("setRestaurantAddress", restaurantAddress);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setRestaurantAddress", {});
        });
    });
  },

  createRestaurantAddress({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantAddressService.create(body)
        .then(({ data }) => {
          const restaurantAddress = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantAddress", restaurantAddress);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setRestaurantAddresses", {});
        });
    });
  },
  updateRestaurantAddress({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantAddressService.update(body)
        .then(({ data }) => {
          const restaurantAddress = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantAddress", restaurantAddress);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setRestaurantAddresses", {});
        });
    });
  },

  removeRestaurantAddress({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantAddressService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.restaurantAddresses.findIndex((x) => x.id === id);
          const restaurantAddresses = [...state.restaurantAddresses];
          restaurantAddresses.splice(index, 1);

          commit("setRestaurantAddresses", restaurantAddresses);

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
  getRestaurantAddresses: (state) => {
    return state.restaurantAddresses;
  },
  getRestaurantAddress: (state) => {
    return state.restaurantAddress;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
