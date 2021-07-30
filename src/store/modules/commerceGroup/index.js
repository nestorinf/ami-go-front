import CommerceGroupService from '@/services/commerceGroup'

const state = {
    commerceGroups: [],
    commerceGroup: {},

}


const mutations = {
    setCommerceGroups(state, commerceGroups) {
        state.commerceGroups = commerceGroups
    },
    setCommerceGroup(state, commerceGroup) {
        state.commerceGroup = commerceGroup
    }
}


const actions = {
    getCommerceGroupData({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            var set_type = (type==undefined)?'COMMERCE':'MARKET';
            dispatch('loading/loadingState', true, { root: true })
            CommerceGroupService.all(set_type).then(({ data }) => {
                const commerceGroups = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceGroups', commerceGroups)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerces', [])
            })
        })
    },

    getCommerceGroupById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceGroupService.getById(id).then(({ data }) => {
                const commerceGroup = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceGroup', commerceGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createCommerceGroup({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceGroupService.create(body).then(({ data }) => {
                const commerceGroup = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceGroup', commerceGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateCommerceGroup({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceGroupService.update(body).then(({ data }) => {
                const commerceGroup = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceGroup', commerceGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeCommerceGroup({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceGroupService.remove(id).then(({ data }) => {
                const index = state.commerceGroups.findIndex(x => x.id === id)
                const commerceGroups = [...state.commerceGroups]
                commerceGroups.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceGroups', commerceGroups)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypess', {})
            })
        })
    }
}
const getters = {
    getCommerceGroups: state => {
        return state.commerceGroups
    },
    getCommerceGroup: state => {
        return state.commerceGroup
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}