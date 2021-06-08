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
    getCommercesData({ commit }) {
        return new Promise((resolve, reject) => {
            CommerceService.all().then(({ data }) => {
                const commerces = data.payload

                commit('setCommerces', commerces)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerces', [])
            })
        })
    },

    getCommerceById({ commit }, id) {
        return new Promise((resolve, reject) => {
            CommerceService.getById(id).then(({ data }) => {
                const company = data.payload

                commit('setCommerce', company)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createCommerce({ commit }, body) {
        return new Promise((resolve, reject) => {
            CommerceService.create(body).then(({ data }) => {
                const commerce = Object.assign({}, data.payload)

                commit('setCommerce', commerce)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateCommerce({ commit }, body) {
        return new Promise((resolve, reject) => {
            CommerceService.update(body).then(({ data }) => {
                const commerce = Object.assign({}, data.payload)

                commit('setCommerce', commerce)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeCommerce({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            CommerceService.remove(id).then(({ data }) => {
                const index = state.commerces.findIndex(x => x.id === id)
                const commerce = [...state.commerces]
                commerce.splice(index, 1)

                commit('setCommerce', commerce)

                resolve(data.payload)
            }).catch(err => {

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