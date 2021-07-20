import PromotionService from "@/services/promotion";

const state = {
    promotions: [],
    promotion: {},
};

const mutations = {
    setPromotions(state, promotions) {
        state.promotions = promotions;
    },
    setPromotion(state, promotion) {
        state.promotion = promotion;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getPromotionData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionService.all()
                .then(({ data }) => {
                    const promotions = data.payload;

                    commit("setPromotions", promotions);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotions", []);
                });
        });
    },

    getPromotionById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionService.getById(id)
                .then(({ data }) => {
                    const promotion = data.payload;

                    commit("setPromotion", promotion);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotion", {});
                });
        });
    },

    createPromotion({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionService.create(body)
                .then(({ data }) => {
                    const promotion = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotion", promotion);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotion", {});
                });
        });
    },
    updatePromotion({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionService.update(body)
                .then(({ data }) => {
                    const promotion = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotion", promotion);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotion", {});
                });
        });
    },

    removePromotion({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.promotions.findIndex((x) => x.id === id);
                    const promotions = [...state.promotions];
                    promotions.splice(index, 1);

                    commit("setPromotions", promotions);

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
    getPromotions: (state) => {
        return state.promotions;
    },
    getPromotion: (state) => {
        return state.promotion;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
