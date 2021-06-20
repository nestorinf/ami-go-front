import FrequentQuestionService from "@/services/frequentQuestion";

const state = {
  frequentQuestions: [],
  frequentQuestion: {},
};

const mutations = {
  setFrequentQuestions(state, frequentQuestions) {
    state.frequentQuestions = frequentQuestions;
  },
  setFrequentQuestion(state, frequentQuestions) {
    state.frequentQuestions = frequentQuestions;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getFrequentQuestionData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FrequentQuestionService.all()
        .then(({ data }) => {
          const frequentQuestion = data.payload;
          commit("setFrequentQuestions", frequentQuestion);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestions", []);
        });
    });
  },

  getFrequentQuestionById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FrequentQuestionService.getById(id)
        .then(({ data }) => {
          const frequentQuestion = data.payload;

          commit("setFrequentQuestion", frequentQuestion);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestion", {});
        });
    });
  },

  createFrequentQuestion({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FrequentQuestionService.create(body)
        .then(({ data }) => {
          const frequentQuestion = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestion", frequentQuestion);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestions", {});
        });
    });
  },
  updateFrequentQuestion({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FrequentQuestionService.update(body)
        .then(({ data }) => {
          const frequentQuestion = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestion", frequentQuestion);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setFrequentQuestions", {});
        });
    });
  },

  removeFrequentQuestion({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      FrequentQuestionService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.frequentQuestions.findIndex((x) => x.id === id);
          const frequentQuestions = [...state.frequentQuestions];
          frequentQuestions.splice(index, 1);

          commit("setFrequentQuestions", frequentQuestions);

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
  getFrequentQuestions: (state) => {
    return state.frequentQuestions;
  },
  getFrequentQuestion: (state) => {
    return state.frequentQuestion;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
