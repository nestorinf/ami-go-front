import DriverService from "@/services/driver";

const state = {
    drivers: [],
    driver: {},
};

const mutations = {
    setDrivers(state, drivers) {
        state.drivers = drivers;
    },
    setDriver(state, driver) {
        state.driver = driver;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getDriverData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverService.all()
                .then(({ data }) => {
                    const drivers = data.payload;

                    commit("setDrivers", drivers);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDrivers", []);
                });
        });
    },

    getDriverById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverService.getById(id)
                .then(({ data }) => {
                    const driver = data.payload;

                    commit("setDriver", driver);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriver", {});
                });
        });
    },

    createDriver({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverService.create(body)
                .then(({ data }) => {
                    const driver = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriver", driver);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriver", {});
                });
        });
    },
    updateDriver({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverService.update(body)
                .then(({ data }) => {
                    const driver = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriver", driver);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriver", {});
                });
        });
    },

    removeDriver({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.drivers.findIndex((x) => x.id === id);
                    const drivers = [...state.drivers];
                    drivers.splice(index, 1);

                    commit("setDrivers", drivers);

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
    getDrivers: (state) => {
        return state.drivers;
    },
    getDriver: (state) => {
        return state.driver;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
