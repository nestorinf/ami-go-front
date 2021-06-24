import AuthService from '@/services/auth'
import router from '@/router'
const state = {
    authUser: {},
    loading: false
}

const mutations = {
    setAuth(state, authUser) {
        state.authUser = authUser
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setToken(state, token) {
        state.token = token
    }
}

const actions = {
    login({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            sessionStorage.clear()

            dispatch('loading/loadingState', true, { root: true })

            AuthService.login(body).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })

                sessionStorage.setItem('token', data.payload.access_token)

                sessionStorage.setItem('user', JSON.stringify(data.payload.user))
                sessionStorage.setItem('role_user', JSON.stringify(data.payload.role_user))
                commit('setAuth', Object.assign({}, data.payload.user))
                router.push({ path: "/" });

                resolve(data.payload.user)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setLoading', false)
            })
        })
    },

    logout({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            commit('setLoading', true)
            dispatch('loading/loadingState', true, { root: true })
            AuthService.logout()
                .then((response) => {


                    commit('setLoading', false)
                    commit('setAuth', {})
                    dispatch('loading/loadingState', false, { root: true })
                    resolve(response)
                }).catch((err) => {
                    dispatch('loading/loadingState', false, { root: true })
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