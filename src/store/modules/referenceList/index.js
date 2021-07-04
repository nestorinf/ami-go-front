import ReferenceListService from "@/services/referenceList";

const state = {
  referenceLists: [],
  referenceListByReferences: [],
  referenceList: {},
};

const mutations = {
  setReferenceLists(state, referenceLists) {
    state.referenceLists = referenceLists;
  },
  setReferenceListByReferences(state, referenceListByReferences) {
    state.referenceListByReferences = referenceListByReferences;
  },
  setReferenceList(state, referenceLists) {
    state.referenceLists = referenceLists;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getReferenceListData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.all()
        .then(({ data }) => {
          const referenceList = data.payload;

          commit("setReferenceLists", referenceList);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceLists", []);
        });
    });
  },
  getReferenceListByReferenceIdData({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.getReferenceListByReferenceId(id)
        .then(({ data }) => {
          const referenceList = data.payload;

          commit("setReferenceListByReferences", referenceList);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceListByReferences", []);
        });
    });
  },

  getReferenceListById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.getById(id)
        .then(({ data }) => {
          const referenceList = data.payload;

          commit("setReferenceList", referenceList);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceList", {});
        });
    });
  },

  createReferenceList({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.create(body)
        .then(({ data }) => {
          const referenceList = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceList", referenceList);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceLists", {});
        });
    });
  },
  updateReferenceList({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.update(body)
        .then(({ data }) => {
          const referenceList = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceList", referenceList);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setReferenceLists", {});
        });
    });
  },

  removeReferenceList({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      ReferenceListService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.referenceLists.findIndex((x) => x.id === id);
          const referenceLists = [...state.referenceLists];
          referenceLists.splice(index, 1);

          commit("setReferenceLists", referenceLists);

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
  getReferenceLists: (state) => {
    return state.referenceLists;
  },
  getReferenceListByReferences: (state) => {
    return state.referenceListByReferences;
  },
  getReferenceList: (state) => {
    return state.referenceList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
