import GeofenceRestrictionService from "@/services/geofenceRestriction";

const state = {
  geofenceRestrictions: [],
  geofenceRestriction: {},
};

const mutations = {
  setGeofenceRestrictions(state, geofenceRestrictions) {
    state.geofenceRestrictions = geofenceRestrictions;
  },
  setGeofenceRestriction(state, geofenceRestriction) {
    state.geofenceRestriction = geofenceRestriction;
  },
};

const actions = {
  getGeofenceRestrictionData({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.all()
        .then(({ data }) => {
          const geofenceRestrictions = data.payload;

          commit("setGeofenceRestrictions", geofenceRestrictions);
          dispatch("loading/loadingState", false, { root: true });

          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  getGeofenceRestrictionById({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.getById(id)
        .then(({ data }) => {
          const company = data.payload;

          commit("setGeofenceRestriction", company);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  getGeofenceRestrictionsByGeofence({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.allGeofenceRestrictionsByGeofence(id)
        .then(({ data }) => {
          const geofenceRestrictions = data.payload;

          commit("setGeofenceRestrictions", geofenceRestrictions);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          reject(err);
          commit("setGeofenceRestrictions", []);
        });
    });
  },

  createGeofenceRestriction({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.create(body)
        .then(({ data }) => {
          const geofenceRestriction = Object.assign({}, data.payload);

          commit("setGeofenceRestriction", geofenceRestriction);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },
  updateGeofenceRestriction({ commit, dispatch }, body) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.update(body)
        .then(({ data }) => {
          const geofenceRestriction = Object.assign({}, data.payload);

          commit("setGeofenceRestriction", geofenceRestriction);
          dispatch("loading/loadingState", false, { root: true });
          resolve(data.payload);
        })
        .catch((err) => {
          dispatch("loading/loadingState", false, { root: true });
          reject(err);
        });
    });
  },

  removeGeofenceRestriction({ commit, dispatch, state }, id) {
    return new Promise((resolve, reject) => {
      dispatch("loading/loadingState", true, { root: true });
      GeofenceRestrictionService.remove(id)
        .then(({ data }) => {
          const index = state.geofenceRestrictions.findIndex(
            (x) => x.id === id
          );
          const geofenceRestriction = Object.assign(
            [],
            state.geofenceRestrictions
          );
          geofenceRestriction.splice(index, 1);

          commit("setGeofenceRestrictions", geofenceRestriction);
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
  getGeofenceRestrictions: (state) => {
    return state.geofenceRestrictions;
  },
  getGeofenceRestriction: (state) => {
    return state.geofenceRestriction;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
