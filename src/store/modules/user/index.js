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
    getUsersData({ commit }) {
        return new Promise((resolve, reject) => {
            UserService.all().then(({ data }) => {
                const users = data.payload

                commit('setUsers', users)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setUsers', [])
            })
        })
    },

    getUserById({ commit }, id) {
        return new Promise((resolve, reject) => {
            UserService.getById(id).then(({ data }) => {
                const company = data.payload

                commit('setUser', company)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setUserType', {})
            })
        })
    },

    createUser({ commit }, body) {
        return new Promise((resolve, reject) => {
            UserService.create(body).then(({ data }) => {
                const user = Object.assign({}, data.payload)

                commit('setUser', user)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setUserTypes', {})
            })
        })
    },
    updateUser({ commit }, body) {
        return new Promise((resolve, reject) => {
            UserService.update(body).then(({ data }) => {
                const user = Object.assign({}, data.payload)

                commit('setUser', user)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeUser({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            UserService.remove(id).then(({ data }) => {
                const index = state.users.findIndex(x => x.id === id)
                const user = [...state.users]
                user.splice(index, 1)

                commit('setUser', user)

                resolve(data.payload)
            }).catch(err => {

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