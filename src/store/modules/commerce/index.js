import CommerceService from '@/services/commerce'

const state = {
    commerces: [],
    commerce: {},

}


const mutations = {
    setCommerces(state, commerces) {
        state.commerces = commerces
    },
    setCommerce(state, commerce) {
        state.commerce = commerce
    }
}


const actions = {
    getCommercesData({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.all(type).then(({ data }) => {
                const commerces = data.payload

                commit('setCommerces', commerces)
                dispatch('loading/loadingState', false, { root: true })

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerces', [])
            })
        })
    },

    getCommerceById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.getById(id).then(({ data }) => {
                const company = data.payload

                commit('setCommerce', company)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },
    getProductsByIdCommerce({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.getProductsByIdCommerce(id).then(({ data }) => {
                const company = data.payload
                commit('setCommerce', company)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createCommerce({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.create(body).then(({ data }) => {
                const commerce = Object.assign({}, data.payload)

                commit('setCommerce', commerce)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateCommerce({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.update(body).then(({ data }) => {
                const commerce = Object.assign({}, data.payload)

                commit('setCommerce', commerce)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeCommerce({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CommerceService.remove(id).then(({ data }) => {
                const index = state.commerces.findIndex(x => x.id === id)
                const commerce = Object.assign([], state.commerces)
                commerce.splice(index, 1)

                commit('setCommerces', commerce)
                dispatch('loading/loadingState', false, { root: true })
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
    getCommerces: state => {
        return state.commerces
    },
    getCommerce: state => {
        return state.commerce
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}