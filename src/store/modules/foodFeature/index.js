import FoodFeatureService from '@/services/foodFeature'

const state = {
    foodFeatures: [],
    foodFeature: {},

}


const mutations = {
    setFoodFeatures(state, foodFeatures) {
        state.foodFeatures = foodFeatures
    },
    setFoodFeature(state, foodFeature) {
        state.foodFeature = foodFeature
    }
}


const actions = {
    getFoodFeaturesData({ commit, dispatch }, idfood) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            FoodFeatureService.all(idfood).then(({ data }) => {
                const foodFeatures = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setFoodFeatures', foodFeatures)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setFoodFeatures', [])
            })
        })
    },

    getFoodFeatureById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            FoodFeatureService.getById(id).then(({ data }) => {
                const foodFeature = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setFoodFeature', foodFeature)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setFoodFeatureType', {})
            })
        })
    },

    createFoodFeature({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            FoodFeatureService.create(body).then(({ data }) => {
                const foodFeature = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setFoodFeature', foodFeature)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setFoodFeatureTypes', {})
            })
        })
    },
    updateFoodFeature({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            FoodFeatureService.update(body).then(({ data }) => {
                const foodFeature = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setFoodFeature', foodFeature)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeFoodFeature({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            FoodFeatureService.remove(id).then(({ data }) => {
                const index = state.foodFeatures.findIndex(x => x.id === id)
                const foodFeatures = [...state.foodFeatures]
                foodFeatures.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setFoodFeatures', foodFeatures)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setFoodFeatureTypess', {})
            })
        })
    }
}
const getters = {
    getFoodFeatures: state => {
        return state.foodFeatures
    },
    getFoodFeature: state => {
        return state.foodFeature
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}