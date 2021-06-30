import DriverCarService from "@/services/driverCar";

const state = {
    driverCars: [],
    driverCar: {},
};

const mutations = {
    setDrivers(state, driverCars) {
        state.driverCars = driverCars;
    },
    setDriverCar(state, driverCar) {
        state.driverCar = driverCar;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
};

const actions = {
    getDriverCarData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverCarService.all()
                .then(({ data }) => {
                    const driverCars = data.payload;

                    commit("setDriverCars", driverCars);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCars", []);
                });
        });
    },

    getDriverCarById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverCarService.getById(id)
                .then(({ data }) => {
                    const driverCar = data.payload;

                    commit("setDriverCar", driverCar);
                    dispatch("loading/loadingState", false, { root: true });
                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCar", {});
                });
        });
    },

    createDriverCar({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverCarService.create(body)
                .then(({ data }) => {
                    const driverCar = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCar", driverCar);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCar", {});
                });
        });
    },
    updateDriverCar({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverCarService.update(body)
                .then(({ data }) => {
                    const driverCar = Object.assign({}, data.payload);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCar", driverCar);

                    resolve(data.payload);
                })
                .catch((err) => {
                    reject(err);
                    dispatch("loading/loadingState", false, { root: true });
                    commit("setDriverCar", {});
                });
        });
    },

    removeDriverCar({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch("loading/loadingState", true, { root: true });
            DriverCarService.remove(id)
                .then(({ data }) => {
                    dispatch("loading/loadingState", false, { root: true });
                    const index = state.driverCars.findIndex((x) => x.id === id);
                    const driverCars = [...state.driverCars];
                    driverCars.splice(index, 1);

                    commit("setDriverCars", driverCars);

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
    getDriverCars: (state) => {
        return state.driverCars;
    },
    getDriverCar: (state) => {
        return state.driverCar;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
