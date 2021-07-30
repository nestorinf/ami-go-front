import ProductService from "@/services/product";

const state = {
    products: [],
    product: {},
};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setProduct(state, product) {
        state.product = product;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getProductData({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            var set_type = (type==undefined)?0:type;
            dispatch("loading/loadingState", true, { root: true });
            ProductService.all(set_type)
                .then(({ data }) => {
                    const products = data.payload;

                    commit("setProducts", products);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProducts", []);
                });
        });
    },

    getProductById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductService.getById(id)
                .then(({ data }) => {
                    const product = data.payload;

                    commit("setProduct", product);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProduct", {});
                });
        });
    },

    createProduct({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductService.create(body)
                .then(({ data }) => {
                    const product = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProduct", product);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProduct", {});
                });
        });
    },
    updateProduct({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductService.update(body)
                .then(({ data }) => {
                    const product = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProduct", product);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setProduct", {});
                });
        });
    },

    removeProduct({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            ProductService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.products.findIndex((x) => x.id === id);
                    const products = [...state.products];
                    products.splice(index, 1);

                    commit("setProducts", products);

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
    getProducts: (state) => {
        return state.products;
    },
    getProduct: (state) => {
        return state.product;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
