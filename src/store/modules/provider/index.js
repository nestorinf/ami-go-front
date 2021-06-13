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
    getProvidersData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ProviderService.all().then(({ data }) => {
                const providers = data.payload
                dispatch('loading/loadingState', false, { root: true })
                commit('setProviders', providers)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setproviders', [])
            })
        })
    },

    getProviderById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ProviderService.getById(id).then(({ data }) => {
                const provider = data.payload
                dispatch('loading/loadingState', false, { root: true })
                commit('setProvider', provider)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createProvider({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ProviderService.create(body).then(({ data }) => {
                const providers = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setProviders', providers)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateProvider({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ProviderService.update(body).then(({ data }) => {
                const provider = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setProvider', provider)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setprovider', {})
            })
        })
    },

    removeProvider({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ProviderService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })
                const index = state.providers.findIndex(x => x.id === id)
                const providers = [...state.providers]
                providers.splice(index, 1)

                commit('setProviders', providers)

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