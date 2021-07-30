import CategoryService from '@/services/category'

const state = {
    categories: [],
    category: {},

}


const mutations = {
    setCategories(state, categories) {
        state.categories = categories
    },
    setCategory(state, category) {
        state.category = category
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}


const actions = {
    getCategoriesData({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.all(type).then(({ data }) => {
                const category = data.payload

                commit('setCategories', category)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCategories', [])
            })
        })
    },
    getCategoriesDataIntern({ commit, dispatch }, type) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.allIntern(type).then(({ data }) => {
                const category = data.payload

                commit('setCategories', category)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCategories', [])
            })
        })
    },
    getCategoriesDataInternCommerce({ commit, dispatch }, commerce_id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.allInternByCommerce(commerce_id).then(({ data }) => {
                const category = data.payload

                commit('setCategories', category)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCategories', [])
            })
        })
    },

    getCategoryByID({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.getById(id).then(({ data }) => {

                const category = data.payload

                commit('setCategory', category)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {

                reject(err)
                commit('setCategory', {})
            })
        })
    },

    createCategory({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.create(body).then(({ data }) => {
                const category = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setCategory', category)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCategories', {})
            })
        })
    },
    updateCategory({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.update(body).then(({ data }) => {
                const category = Object.assign({}, data.payload)
                dispatch('loading/loadingState', false, { root: true })
                commit('setCategory', category)

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                commit('setCategories', {})
            })
        })
    },

    removeCategory({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            CategoryService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })
                const index = state.categories.findIndex(x => x.id === id)
                const categories = [...state.categories]
                categories.splice(index, 1)

                commit('setCategories', categories)

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
    getCategories: state => {
        return state.categories
    },
    getCategory: state => {
        return state.category
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}