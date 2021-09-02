import FoodCategoryService from "@/services/foodCategory";

const state = {
  foodCategorys: [],
  foodCategory: {},
};

const mutations = {
  setFoodCategorys(state, foodCategorys) {
    state.foodCategorys = foodCategorys;
  },
  setFoodCategory(state, foodCategorys) {
    state.foodCategorys = foodCategorys;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getFoodCategoryData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.all()
        .then(({ data }) => {
          const foodCategory = data.payload;

          commit("setFoodCategorys", foodCategory);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategorys", []);
        });
    });
  },
  getCategoryByRestaurantData({ commit, dispatch },id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.getCategoryByRestaurant(id)
        .then(({ data }) => {
          const foodCategory = data.payload;

          commit("setFoodCategorys", foodCategory);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategorys", []);
        });
    });
  },

  getFoodCategoryById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.getById(id)
        .then(({ data }) => {
          const foodCategory = data.payload;

          commit("setFoodCategory", foodCategory);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategory", {});
        });
    });
  },

  createFoodCategory({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.create(body)
        .then(({ data }) => {
          const foodCategory = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategory", foodCategory);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategorys", {});
        });
    });
  },
  updateFoodCategory({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.update(body)
        .then(({ data }) => {
          const foodCategory = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategory", foodCategory);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoodCategorys", {});
        });
    });
  },

  removeFoodCategory({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodCategoryService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.foodCategorys.findIndex((x) => x.id === id);
          const foodCategorys = [...state.foodCategorys];
          foodCategorys.splice(index, 1);

          commit("setFoodCategorys", foodCategorys);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          // commit('setCommerceCategoryss', {})
        });
    });
  },
};
const getters = {
  getFoodCategorys: (state) => {
    return state.foodCategorys;
  },
  getFoodCategory: (state) => {
    return state.foodCategory;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
