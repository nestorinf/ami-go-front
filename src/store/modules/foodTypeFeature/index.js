import FoodTypeFeatureService from "@/services/foodTypeFeature";

const state = {
  foodTypeFeatures: [],
  foodTypeFeature: {},
};

const mutations = {
  setFoodTypeFeatures(state, foodTypeFeatures) {
    state.foodTypeFeatures = foodTypeFeatures;
  },
  setFoodTypeFeature(state, foodTypeFeatures) {
    state.foodTypeFeatures = foodTypeFeatures;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getFoodTypeFeatureData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodTypeFeatureService.all()
        .then(({ data }) => {
          const foodTypeFeature = data.payload;

          commit("setFoodTypeFeatures", foodTypeFeature);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeatures", []);
        });
    });
  },

  getFoodTypeFeatureById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodTypeFeatureService.getById(id)
        .then(({ data }) => {
          const foodTypeFeature = data.payload;

          commit("setFoodTypeFeature", foodTypeFeature);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeature", {});
        });
    });
  },

  createFoodTypeFeature({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodTypeFeatureService.create(body)
        .then(({ data }) => {
          const foodTypeFeature = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeature", foodTypeFeature);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeatures", {});
        });
    });
  },
  updateFoodTypeFeature({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodTypeFeatureService.update(body)
        .then(({ data }) => {
          const foodTypeFeature = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeature", foodTypeFeature);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodTypeFeatures", {});
        });
    });
  },

  removeFoodTypeFeature({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodTypeFeatureService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.foodTypeFeatures.findIndex((x) => x.id === id);
          const foodTypeFeatures = [...state.foodTypeFeatures];
          foodTypeFeatures.splice(index, 1);

          commit("setFoodTypeFeatures", foodTypeFeatures);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          // commit('setCommerceTypeFeaturess', {})
        });
    });
  },
};
const getters = {
  getFoodTypeFeatures: (state) => {
    return state.foodTypeFeatures;
  },
  getFoodTypeFeature: (state) => {
    return state.foodTypeFeature;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
