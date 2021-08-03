import ProductsBatchesDetailService from "@/services/productBatchesDetail";

const state = {
    productsBatchesDetail: [],
    productBatchesDetail: {},
};

const mutations = {
    setProductsBatches(state, productsBatchesDetail) {
        state.productsBatchesDetail = productsBatchesDetail;
    },
    setProductsBatchesDetail(state, productBatchesDetail) {
        state.productBatchesDetail = productBatchesDetail;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getProductsBatchesDetailData({ commit, dispatch }, id_bacth) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductsBatchesDetailService.getById(id_bacth)
                .then(({ data }) => {
                    const productsBatchesDetail = data.payload;

                    commit("setProductsBatches", productsBatchesDetail);
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

    getProductsBatchesDetailById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductsBatchesDetailService.getById(id)
                .then(({ data }) => {
                    const productBatchesDetail = data.payload;

                    commit("setProductsBatchesDetail", productBatchesDetail);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatchesDetail", {});
                });
        });
    },

    createProductsBatchesDetail({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductsBatchesDetailService.create(body)
                .then(({ data }) => {
                    const productBatchesDetail = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatchesDetail", productBatchesDetail);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatchesDetail", {});
                });
        });
    },
    updateProductsBatchesDetail({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductsBatchesDetailService.update(body)
                .then(({ data }) => {
                    const productBatchesDetail = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatchesDetail", productBatchesDetail);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProductsBatchesDetail", {});
                });
        });
    },

    removeProductsBatchesDetail({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductsBatchesDetailService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.productsBatchesDetail.findIndex((x) => x.id === id);
                    console.log('index',index);
                    const productsBatchesDetail = [...state.productsBatchesDetail];                    console.log('',);
                    console.log('productsBatchesDetail',productsBatchesDetail);
                    productsBatchesDetail.splice(index, 1);                    
                    console.log('productsBatchesDetail',productsBatchesDetail);

                    commit("setProductsBatches", productsBatchesDetail);

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
        return state.productsBatchesDetail;
    },
    getProductsBatchesDetail: (state) => {
        return state.productBatchesDetail;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
