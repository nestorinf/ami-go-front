import UserService from '@/services/user'

const state = {
    users: [],
    user: {},

}


const mutations = {
    setUsers(state, users) {
        state.users = users
    },
    setUser(state, user) {
        state.user = user
    }
}


const actions = {
    getUsersData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            UserService.all().then(({ data }) => {
                const users = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setUsers', users)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setUsers', [])
            })
        })
    },

    getUserById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            UserService.getById(id).then(({ data }) => {
                const company = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setUser', company)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setUserType', {})
            })
        })
    },

    createUser({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            UserService.create(body).then(({ data }) => {
                const user = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setUser', user)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setUserTypes', {})
            })
        })
    },
    updateUser({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            UserService.update(body).then(({ data }) => {
                const user = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setUser', user)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeUser({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            UserService.remove(id).then(({ data }) => {
                const index = state.users.findIndex(x => x.id === id)
                const users = [...state.users]
                users.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setUsers', users)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setUserTypess', {})
            })
        })
    }
}
const getters = {
    getUsers: state => {
        return state.users
    },
    getUser: state => {
        return state.user
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}