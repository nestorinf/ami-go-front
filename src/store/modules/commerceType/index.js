import CommerceTypeService from '@/services/commerceType'

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
    getCommerceTypeData({ commit }) {
        return new Promise((resolve, reject) => {
            CommerceTypeService.all().then(({ data }) => {
                const commerceType = data.payload

                commit('setCommerceTypes', commerceType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCommerceTypes', [])
            })
        })
    },

    getCommerceTypeById({ commit }, id) {
        return new Promise((resolve, reject) => {
            CommerceTypeService.getById(id).then(({ data }) => {
                const commerceType = data.payload

                commit('setCommerceType', commerceType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCommerceType', {})
            })
        })
    },

    createCommerceType({ commit }, body) {
        return new Promise((resolve, reject) => {
            CommerceTypeService.create(body).then(({ data }) => {
                const commerceType = Object.assign({}, data.payload)

                commit('setCommerceType', commerceType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCommerceTypes', {})
            })
        })
    },
    updateCommerceType({ commit }, body) {
        return new Promise((resolve, reject) => {
            CommerceTypeService.update(body).then(({ data }) => {
                const commerceType = Object.assign({}, data.payload)

                commit('setCommerceType', commerceType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCommerceTypes', {})
            })
        })
    },

    removeCommerceType({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            CommerceTypeService.remove(id).then(({ data }) => {
                const index = state.commerceTypes.findIndex(x => x.id === id)
                const commerceTypes = [...state.commerceTypes]
                commerceTypes.splice(index, 1)

                commit('setCommerceTypes', commerceTypes)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypess', {})
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