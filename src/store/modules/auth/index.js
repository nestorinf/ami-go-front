import AuthService from '@/services/auth'

const state = {
    authUser: {},
    loading: false,
}

const mutations = {
    setAuth(state, authUser) {
        state.authUser = authUser
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}

const actions = {
    login({ commit }, body) {
        return new Promise((resolve, reject) => {
            commit('setLoading', true)

            AuthService.login(body).then(({ data }) => {
                commit('setAuth', Object.assign({}, data.payload.user))
                commit('setLoading', false)
                localStorage.setItem('token', data.payload.access_token)
                resolve(data.payload.user)
            }).catch(err => {

                reject(err)
                commit('setLoading', false)
            })
        })
    }
}

const getters = {
    getAuth: state => {
        return state.authUser
    },

    getLoading: state => {
        return state.loading
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}