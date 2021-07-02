import CommerceDirectionService from "@/services/commerceDirection";

const state = {
  commerceDirections: [],
  commerceDirection: {},
};

const mutations = {
  setCommerceDirections(state, commerceDirections) {
    state.commerceDirections = commerceDirections;
  },
  setCommerceDirection(state, commerceDirection) {
    state.commerceDirection = commerceDirection;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getCommerceDirectionData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceDirectionService.all()
        .then(({ data }) => {
          const commerceDirection = data.payload;

          commit("setCommerceDirections", commerceDirection);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceDirections", []);
        });
    });
  },

  getCommerceDirectionById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceDirectionService.getById(id)
        .then(({ data }) => {
          const commerceDirection = data.payload;

          commit("setCommerceDirection", commerceDirection);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceDirection", {});
        });
    });
  },

  createCommerceDirection({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceDirectionService.create(body)
        .then(({ data }) => {
          const commerceDirection = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCommerceDirection", commerceDirection);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceDirections", {});
        });
    });
  },
  updateCommerceDirection({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceDirectionService.update(body)
        .then(({ data }) => {
          const commerceDirection = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setCommerceDirection", commerceDirection);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          commit("setCommerceDirections", {});
        });
    });
  },

  removeCommerceDirection({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      CommerceDirectionService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.commerceDirections.findIndex((x) => x.id === id);
          const commerceDirections = [...state.commerceDirections];
          commerceDirections.splice(index, 1);

          commit("setCommerceDirections", commerceDirections);

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
  getCommerceDirections: (state) => {
    return state.commerceTypes;
  },
  getCommerceDirection: (state) => {
    return state.commerceType;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
