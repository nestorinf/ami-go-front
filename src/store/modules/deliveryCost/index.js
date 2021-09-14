import DeliveryCostService from "@/services/deliveryCost";

const state = {
  deliveryCosts: [],
  deliveryCost: {},
};

const mutations = {
  setDeliveryCosts(state, deliveryCosts) {
    state.deliveryCosts = deliveryCosts;
  },
  setDeliveryCost(state, deliveryCosts) {
    state.deliveryCosts = deliveryCosts;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

const actions = {
  getDeliveryCostData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      DeliveryCostService.all()
        .then(({ data }) => {
          const deliveryCost = data.payload;

          commit("setDeliveryCosts", deliveryCost);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCosts", []);
        });
    });
  },
  //   getdeliveryCostByReferenceIdData({ commit, dispatch }, id) {
  //     return new Promise((resolve, reject) => {
  //       dispatch("loading/loadingState", true, { root: true });
  //       DeliveryCostService.getDeliveryCostByReferenceId(id)
  //         .then(({ data }) => {
  //           const deliveryCost = data.payload;

  //           commit("setDeliveryCostByReferences", deliveryCost);
  //           dispatch("loading/loadingState", false, { root: true });
  //           resolve(data.payload);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //           dispatch("loading/loadingState", false, { root: true });
  //           commit("setDeliveryCostByReferences", []);
  //         });
  //     });
  //   },
  getDeliveryCostById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      DeliveryCostService.getById(id)
        .then(({ data }) => {
          const deliveryCost = data.payload;

          commit("setDeliveryCost", deliveryCost);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCost", {});
        });
    });
  },

  createDeliveryCost({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      DeliveryCostService.create(body)
        .then(({ data }) => {
          const deliveryCost = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCost", deliveryCost);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCosts", {});
        });
    });
  },
  updateDeliveryCost({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      DeliveryCostService.update(body)
        .then(({ data }) => {
          const deliveryCost = Object.assign({}, data.payload);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCost", deliveryCost);

          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          dispatch("loading/loadingState", false, { root: true });
          commit("setDeliveryCosts", {});
        });
    });
  },

  removeDeliveryCost({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      DeliveryCostService.remove(id)
        .then(({ data }) => {
          dispatch("loading/loadingState", false, { root: true });
          const index = state.deliveryCosts.findIndex((x) => x.id === id);
          const deliveryCosts = [...state.deliveryCosts];
          deliveryCosts.splice(index, 1);

          commit("setDeliveryCosts", deliveryCosts);

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
  getDeliveryCosts: (state) => {
    return state.deliveryCosts;
  },
  getDeliveryCost: (state) => {
    return state.deliveryCost;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
