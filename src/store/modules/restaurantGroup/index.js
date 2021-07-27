import RestaurantGroupService from '@/services/restaurantGroup'

const state = {
    restaurantGroups: [],
    restaurantGroup: {},

}


const mutations = {
    setRestaurantGroups(state, restaurantGroups) {
        state.restaurantGroups = restaurantGroups
    },
    setRestaurantGroup(state, restaurantGroup) {
        state.restaurantGroup = restaurantGroup
    }
}


const actions = {
    getRestaurantGroupData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantGroupService.all().then(({ data }) => {
                const restaurantGroups = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurantGroups', restaurantGroups)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurants', [])
            })
        })
    },

    getRestaurantGroupById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantGroupService.getById(id).then(({ data }) => {
                const restaurantGroup = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurantGroup', restaurantGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurantType', {})
            })
        })
    },

    createRestaurantGroup({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantGroupService.create(body).then(({ data }) => {
                const restaurantGroup = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurantGroup', restaurantGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurantTypes', {})
            })
        })
    },
    updateRestaurantGroup({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantGroupService.update(body).then(({ data }) => {
                const restaurantGroup = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurantGroup', restaurantGroup)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeRestaurantGroup({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantGroupService.remove(id).then(({ data }) => {
                const index = state.restaurantGroups.findIndex(x => x.id === id)
                const restaurantGroups = [...state.restaurantGroups]
                restaurantGroups.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurantGroups', restaurantGroups)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurantTypess', {})
            })
        })
    }
}
const getters = {
    getRestaurantGroups: state => {
        return state.restaurantGroups
    },
    getRestaurantGroup: state => {
        return state.restaurantGroup
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}