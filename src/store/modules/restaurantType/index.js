import RestaurantTypeService from "@/services/restaurantType";

const state = {
  restaurantTypes: [],
  restaurantType: {},
};

const mutations = {
  setRestaurantTypes(state, restaurantTypes) {
    state.restaurantTypes = restaurantTypes;
  },
  setRestaurantType(state, restaurantTypes) {
    state.restaurantTypes = restaurantTypes;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getRestaurantTypeData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantTypeService.all()
        .then(({ data }) => {
          const restaurantType = data.payload;

          commit("setRestaurantTypes", restaurantType);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantTypes", []);
        });
    });
  },

  getRestaurantTypeById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantTypeService.getById(id)
        .then(({ data }) => {
          const restaurantType = data.payload;

          commit("setRestaurantType", restaurantType);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantType", {});
        });
    });
  },

  createRestaurantType({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantTypeService.create(body)
        .then(({ data }) => {
          const restaurantType = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantType", restaurantType);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantTypes", {});
        });
    });
  },
  updateRestaurantType({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantTypeService.update(body)
        .then(({ data }) => {
          const restaurantType = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantType", restaurantType);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setRestaurantTypes", {});
        });
    });
  },

  removeRestaurantType({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      RestaurantTypeService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.restaurantTypes.findIndex((x) => x.id === id);
          const restaurantTypes = [...state.restaurantTypes];
          restaurantTypes.splice(index, 1);

          commit("setRestaurantTypes", restaurantTypes);

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
  getRestaurantTypes: (state) => {
    return state.restaurantTypes;
  },
  getRestaurantType: (state) => {
    return state.restaurantType;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
