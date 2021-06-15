import RoleService from '@/services/role'

const state = {
    roles: [],
    role: {},

}


const mutations = {
    setRoles(state, roles) {
        state.roles = roles
    },
    setRole(state, role) {
        state.role = role
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}


const actions = {
    getRolesData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RoleService.all().then(({ data }) => {
                const roles = data.payload

                commit('setRoles', roles)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setRoles', [])
            })
        })
    },

    getRoleById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RoleService.getById(id).then(({ data }) => {

                const role = data.payload

                commit('setRole', role)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setRole', {})
            })
        })
    },

    createRole({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RoleService.create(body).then(({ data }) => {
                const role = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setRole', role)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setRoles', {})
            })
        })
    },
    updateRole({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RoleService.update(body).then(({ data }) => {
                const role = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setRole', role)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setRoles', {})
            })
        })
    },

    removeRole({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RoleService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })
                const index = state.roles.findIndex(x => x.id === id)
                const roles = [...state.roles]
                roles.splice(index, 1)

                commit('setRoles', roles)

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
    getRoles: state => {
        return state.roles
    },
    getRole: state => {
        return state.role
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}