
const state = {
    loadingState: false
}

const mutations = {
    setLoading(state, loadingState) {
        state.loadingState = loadingState
    },
}

const actions = {
    loadingState({ commit }, loadingState) {
        commit('setLoading', loadingState)
    }
}
const getters = {
    getLoadingState: state => {
        return state.loadingState
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}