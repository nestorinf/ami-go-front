import FoodService from "@/services/food";

const state = {
  foods: [],
  food: {},
  uoms: [
    {
      text: "Kilogramo",
      value: "kg",
    },
    {
      text: "Gramo",
      value: "gr",
    },
    {
      text: "Litro",
      value: "lt",
    },
    {
      text: "Mililitro",
      value: "ml",
    },
    {
      text: "Libra",
      value: "lb",
    },
  ],
};

const mutations = {
  setFoods(state, foods) {
    state.foods = foods;
  },
  setFood(state, foods) {
    state.foods = foods;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getFoodData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodService.all()
        .then(({ data }) => {
          const food = data.payload;

          commit("setFoods", food);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoods", []);
        });
    });
  },

  getFoodById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodService.getById(id)
        .then(({ data }) => {
          const food = data.payload;

          commit("setFood", food);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFood", {});
        });
    });
  },

  createFood({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodService.create(body)
        .then(({ data }) => {
          const food = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFood", food);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoods", {});
        });
    });
  },
  updateFood({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodService.update(body)
        .then(({ data }) => {
          const food = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFood", food);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFoods", {});
        });
    });
  },

  removeFood({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FoodService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.foods.findIndex((x) => x.id === id);
          const foods = [...state.foods];
          foods.splice(index, 1);

          commit("setFoods", foods);

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
  getFoods: (state) => {
    return state.foods;
  },
  getFood: (state) => {
    return state.food;
  },
  getUoms: (state) => {
    return state.uoms;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
