import ProviderService from '@/services/provider'

const state = {
    providers: [],
    provider: {},

}


const mutations = {
    setProviders(state, providers) {
        state.providers = providers
    },
    setProvider(state, provider) {
        state.provider = provider
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}


const actions = {
    getProvidersData({ commit }) {
        return new Promise((resolve, reject) => {
            ProviderService.all().then(({ data }) => {
                const providers = data.payload

                commit('setProviders', providers)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setproviders', [])
            })
        })
    },

    getProviderById({ commit }, id) {
        return new Promise((resolve, reject) => {
            ProviderService.getById(id).then(({ data }) => {
                const provider = data.payload

                commit('setProvider', provider)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createProvider({ commit }, body) {
        return new Promise((resolve, reject) => {
            ProviderService.create(body).then(({ data }) => {
                const providers = Object.assign({}, data.payload)

                commit('setProviders', providers)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateProvider({ commit }, body) {
        return new Promise((resolve, reject) => {
            ProviderService.update(body).then(({ data }) => {
                const provider = Object.assign({}, data.payload)

                commit('setProvider', provider)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setprovider', {})
            })
        })
    },

    removeProvider({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            ProviderService.remove(id).then(({ data }) => {
                const index = state.providers.findIndex(x => x.id === id)
                const providers = [...state.providers]
                providers.splice(index, 1)

                commit('setProviders', providers)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypess', {})
            })
        })
    }
}
const getters = {
    getProviders: state => {
        return state.providers
    },
    getProvider: state => {
        return state.provider
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}