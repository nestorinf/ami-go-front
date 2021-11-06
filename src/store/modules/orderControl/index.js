import OrderControlService from "@/services/orderControl";

const state = {
  orders: [],
  order: {},
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setOrder(state, order) {
    state.order = order;
  },
};

const actions = {
  getOrdersData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      OrderControlService.all()
        .then(({ data }) => {
          const orders = data.payload;

          dispatch("loading/loadingState", false, { root: true });
          commit("setOrders", orders);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          // commit('setorders', [])
        });
    });
  },

  getOrderById({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      OrderControlService.getById(data)
        .then(({ data }) => {
          const orders = data.payload;
          console.log('data.payload',data.payload)
          dispatch("loading/loadingState", false, { root: true });
          commit("setorder", orders);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          // commit('setorderType', {})
        });
    });
  },

  
  updateOrder({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      OrderControlService.update(body)
        .then(({ data }) => {
          const order = Object.assign({}, data.payload);

          dispatch("loading/loadingState", false, { root: true });
          commit("setorder", order);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          // commit('setCompany', {})
        });
    });
  },

  removeOrder({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      OrderControlService.remove(id)
        .then(({ data }) => {
          const index = state.orders.findIndex((x) => x.id === id);
          const orders = [...state.orders];
          orders.splice(index, 1);

          dispatch("loading/loadingState", false, { root: true });
          commit("setorders", orders);

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
          // commit('setorderTypess', {})
        });
    });
  },
};
const getters = {
  getOrders: (state) => {
    return state.orders;
  },
  getOrder: (state) => {
    return state.order;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
