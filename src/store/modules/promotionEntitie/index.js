import PromotionEntitieService from "@/services/promotionEntitie";

const state = {
    promotionEntities: [],
    promotionEntitie: {},
};

const mutations = {
    setPromotionEntities(state, promotionEntities) {
        state.promotionEntities = promotionEntities;
    },
    setPromotionEntitie(state, promotionEntitie) {
        state.promotionEntitie = promotionEntitie;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getPromotionEntitieData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionEntitieService.all()
                .then(({ data }) => {
                    const promotionEntities = data.payload;

                    commit("setPromotionEntities", promotionEntities);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntities", []);
                });
        });
    },

    getPromotionEntitieById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionEntitieService.getById(id)
                .then(({ data }) => {
                    const promotionEntitie = data.payload;

                    commit("setPromotionEntitie", promotionEntitie);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntitie", {});
                });
        });
    },

    createPromotionEntitie({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionEntitieService.create(body)
                .then(({ data }) => {
                    const promotionEntitie = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntitie", promotionEntitie);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntitie", {});
                });
        });
    },
    updatePromotionEntitie({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionEntitieService.update(body)
                .then(({ data }) => {
                    const promotionEntitie = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntitie", promotionEntitie);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setPromotionEntitie", {});
                });
        });
    },

    removePromotionEntitie({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            PromotionEntitieService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.promotionEntities.findIndex((x) => x.id === id);
                    const promotionEntities = [...state.promotionEntities];
                    promotionEntities.splice(index, 1);

                    commit("setPromotionEntities", promotionEntities);

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
    getPromotionEntities: (state) => {
        return state.promotionEntities;
    },
    getPromotionEntitie: (state) => {
        return state.promotionEntitie;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
