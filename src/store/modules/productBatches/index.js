import ProductBatchesService from "@/services/productBatches";

const state = {
    productsBatches: [],
    productBatches: {},
};

const mutations = {
    setProductsBatches(state, productsBatches) {
        state.productsBatches = productsBatches;
    },
    setProductBatches(state, productBatches) {
        state.productBatches = productBatches;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getProductsBatchesData({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            var set_type = (type==undefined)?0:type;
            dispatch("loading/loadingState", true, { root: true });
            ProductBatchesService.all(set_type)
                .then(({ data }) => {
                    const productsBatches = data.payload;

                    commit("setProductsBatches", productsBatches);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatches", []);
                });
        });
    },

    getProductBatchesById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductBatchesService.getById(id)
                .then(({ data }) => {
                    const productBatches = data.payload;

                    commit("setProductBatches", productBatches);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductBatches", {});
                });
        });
    },

    createProductBatches({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductBatchesService.create(body)
                .then(({ data }) => {
                    const productBatches = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductBatches", productBatches);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductBatches", {});
                });
        });
    },
    updateProductBatches({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductBatchesService.update(body)
                .then(({ data }) => {
                    const productBatches = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductBatches", productBatches);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductBatches", {});
                });
        });
    },

    removeProductBatches({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductBatchesService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.productsBatches.findIndex((x) => x.id === id);
                    const productsBatches = [...state.productsBatches];
                    productsBatches.splice(index, 1);

                    commit("setProductsBatches", productsBatches);

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
    getProductsBatches: (state) => {
        return state.productsBatches;
    },
    getProductBatches: (state) => {
        return state.productBatches;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
