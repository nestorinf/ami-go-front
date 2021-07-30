import CommerceTypeService from '@/services/commerceType'
import AttachmentService from '@/services/attachment'

const state = {
    commerceTypes: [],
    commerceType: {},

}


const mutations = {
    setCommerceTypes(state, commerceTypes) {
        state.commerceTypes = commerceTypes
    },
    setCommerceType(state, commerceType) {
        state.commerceType = commerceType
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}


const actions = {
    getCommerceTypeData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceTypeService.all().then(({ data }) => {
                const commerceType = data.payload

                commit('setCommerceTypes', commerceType)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCommerceTypes', [])
            })
        })
    },

    getCommerceTypeById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceTypeService.getById(id).then(({ data }) => {

                const commerceType = data.payload
              
                commit('setCommerceType', commerceType)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCommerceType', {})
            })
        })
    },

    createCommerceType({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            console.log(body)
            dispatch('loading/loadingState', true, { root: true })
            CommerceTypeService.create(body).then(({ data }) => {
                const commerceType = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceType', commerceType)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCommerceTypes', {})
            })
        })
    },
    updateCommerceType({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
          
            CommerceTypeService.update(body).then(({ data }) => {
                const commerceType = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setCommerceType', commerceType)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCommerceTypes', {})
            })
        })
    },

    removeCommerceType({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceTypeService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })
                const index = state.commerceTypes.findIndex(x => x.id === id)
                const commerceTypes = [...state.commerceTypes]
                commerceTypes.splice(index, 1)

                commit('setCommerceTypes', commerceTypes)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypess', {})
            })
        })
    },

    removeAttachment({ dispatch  }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            AttachmentService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
            })
        })
    }
}
const getters = {
    getCommerceTypes: state => {
        return state.commerceTypes
    },
    getCommerceType: state => {
        return state.commerceType
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}