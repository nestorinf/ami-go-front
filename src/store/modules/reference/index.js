import ReferenceService from "@/services/reference";

const state = {
  references: [],
  reference: {},
};

const mutations = {
  setReferences(state, references) {
    state.references = references;
  },
  setReference(state, references) {
    state.references = references;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getReferenceData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.all()
        .then(({ data }) => {
          const reference = data.payload;

          commit("setReferences", reference);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferences", []);
        });
    });
  },
  getReferenceDataTypeSizes({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.allTypeSizes()
        .then(({ data }) => {
          const reference = data.payload;

          commit("setReferences", reference);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferences", []);
        });
    });
  },

  getReferenceById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.getById(id)
        .then(({ data }) => {
          const reference = data.payload;

          commit("setReference", reference);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReference", {});
        });
    });
  },

  createReference({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.create(body)
        .then(({ data }) => {
          const reference = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReference", reference);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferences", {});
        });
    });
  },
  updateReference({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.update(body)
        .then(({ data }) => {
          const reference = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReference", reference);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferences", {});
        });
    });
  },

  removeReference({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.references.findIndex((x) => x.id === id);
          const references = [...state.references];
          references.splice(index, 1);

          commit("setReferences", references);

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
  getReferences: (state) => {
    return state.references;
  },
  getReference: (state) => {
    return state.reference;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
