import GeofenceService from "@/services/geofence";

const state = {
  geofences: [],
  geofence: {},
};

const mutations = {
  setGeofences(state, geofences) {
    state.geofences = geofences;
  },
  setGeofence(state, geofence) {
    state.geofence = geofence;
  },
};

const actions = {
  getGeofenceData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceService.all()
        .then(({ data }) => {
          const geofences = data.payload;

          commit("setGeofences", geofences);
          dispatch("loading/loadingState", false, { root: true });

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  getGeofenceById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceService.getById(id)
        .then(({ data }) => {
          const company = data.payload;

          commit("setGeofence", company);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  createGeofence({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceService.create(body)
        .then(({ data }) => {
          const geofence = Object.assign({}, data.payload);

          commit("setGeofence", geofence);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },
  updateGeofence({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceService.update(body)
        .then(({ data }) => {
          const geofence = Object.assign({}, data.payload);

          commit("setGeofence", geofence);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  removeGeofence({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceService.remove(id)
        .then(({ data }) => {
          const index = state.geofences.findIndex((x) => x.id === id);
          const geofence = Object.assign([], state.geofences);
          geofence.splice(index, 1);

          commit("setGeofences", geofence);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },
};
const getters = {
  getGeofences: (state) => {
    return state.geofences;
  },
  getGeofence: (state) => {
    return state.geofence;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
