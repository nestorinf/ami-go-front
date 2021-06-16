import MunicipalityService from '@/services/municipality'

const state = {
    municipalities: [],
    municipality: {},

}


const mutations = {
    setMunicipalities(state, municipalities) {
        state.municipalities = municipalities
    },
    setMunicipality(state, municipality) {
        state.municipality = municipality
    }
}


const actions = {
    getMunicipalitiesData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            MunicipalityService.all().then(({ data }) => {
                const municipalities = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setMunicipalities', municipalities)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setMunicipalities', [])
            })
        })
    },

    getMunicipalityById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            MunicipalityService.getById(id).then(({ data }) => {
                const company = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setMunicipality', company)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setMunicipalityType', {})
            })
        })
    },

    createMunicipality({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            MunicipalityService.create(body).then(({ data }) => {
                const municipality = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setMunicipality', municipality)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setMunicipalityTypes', {})
            })
        })
    },
    updateMunicipality({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            MunicipalityService.update(body).then(({ data }) => {
                const municipality = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setMunicipality', municipality)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeMunicipality({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            MunicipalityService.remove(id).then(({ data }) => {
                const index = state.municipalities.findIndex(x => x.id === id)
                const municipalities = [...state.municipalities]
                municipalities.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setMunicipalities', municipalities)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setMunicipalityTypess', {})
            })
        })
    }
}
const getters = {
    getMunicipalities: state => {
        return state.municipalities
    },
    getMunicipality: state => {
        return state.municipality
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}