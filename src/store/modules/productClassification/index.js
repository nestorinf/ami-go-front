import ProductClassificationService from "@/services/classification";

const state = {
  classifications: [],
  classification: {},
  referenceSize:[]
};

const mutations = {
  setClassifications(state, classifications) {
    state.classifications = classifications;
  },
  setClassification(state, classification) {
    state.classification = classification;
  },
  setReferenceSize(state, referenceSize) {
    state.referenceSize = referenceSize;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getClassificationData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.all()
        .then(({ data }) => {
          const classification = data.payload;

          commit("setClassifications", classification);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassifications", []);
        });
    });
  },
  getReferenceSize({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.allReferenceSize()
        .then(({ data }) => {
          const referenceSize = data.payload;

          commit("setReferenceSize", referenceSize);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceSize", []);
        });
    });
  },

  getClassificationById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.getById(id)
        .then(({ data }) => {
          const classification = data.payload;

          commit("setClassification", classification);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassification", {});
        });
    });
  },

  createClassification({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.create(body)
        .then(({ data }) => {
          const classification = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassification", classification);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassification", {});
        });
    });
  },
  updateClassification({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.update(body)
        .then(({ data }) => {
          const classification = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassification", classification);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setClassification", {});
        });
    });
  },

  removeClassification({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ProductClassificationService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.classifications.findIndex((x) => x.id === id);
          const classifications = [...state.classifications];
          classifications.splice(index, 1);

          commit("setClassifications", classifications);

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
  getClassifications: (state) => {
    return state.classifications;
  },
  getClassification: (state) => {
    return state.classification;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
