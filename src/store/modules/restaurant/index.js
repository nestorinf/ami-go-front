import RestaurantService from '@/services/restaurant'

const state = {
    restaurants: [],
    restaurant: {},

}


const mutations = {
    setRestaurants(state, restaurants) {
        state.restaurants = restaurants
    },
    setRestaurant(state, restaurant) {
        state.restaurant = restaurant
    }
}


const actions = {
    getRestaurantsData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantService.all().then(({ data }) => {
                const restaurants = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurants', restaurants)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurants', [])
            })
        })
    },

    getRestaurantById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantService.getById(id).then(({ data }) => {
                const company = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurant', company)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurantType', {})
            })
        })
    },

    createRestaurant({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantService.create(body).then(({ data }) => {
                const restaurant = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurant', restaurant)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setRestaurantTypes', {})
            })
        })
    },
    updateRestaurant({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantService.update(body).then(({ data }) => {
                const restaurant = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurant', restaurant)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeRestaurant({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            RestaurantService.remove(id).then(({ data }) => {
                const index = state.restaurants.findIndex(x => x.id === id)
                const restaurants = [...state.restaurants]
                restaurants.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setRestaurants', restaurants)

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
    getRestaurants: state => {
        return state.restaurants
    },
    getRestaurant: state => {
        return state.restaurant
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}