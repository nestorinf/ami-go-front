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
                commit('setLoading', false)
                localStorage.setItem('token', data.payload.access_token)
                localStorage.setItem('user', JSON.stringify(data.payload.user))
                commit('setAuth', Object.assign({}, data.payload.user))
                resolve(data.payload.user)
            }).catch(err => {

                reject(err)
                commit('setLoading', false)
            })
        })
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('setLoading', true)
            const token = localStorage.getItem('token')
            AuthService.logout(token)
                .then((response) => {

                    commit('setLoading', false)
                    commit('setAuth', {})
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    resolve(response)
                }).catch((err) => {
                    commit('setLoading', false)
                    reject(err)
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