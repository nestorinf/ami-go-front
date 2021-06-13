import PaymentTypeService from '@/services/paymentType'

const state = {
    paymentTypes: [],
    paymentType: {},

}


const mutations = {
    setPaymentTypes(state, paymentTypes) {
        state.paymentTypes = paymentTypes
    },
    setPaymentType(state, paymentType) {
        state.paymentType = paymentType
    }
}


const actions = {
    getPaymentTypesData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            PaymentTypeService.all().then(({ data }) => {
                const paymentTypes = data.payload

                commit('setPaymentTypes', paymentTypes)
                dispatch('loading/loadingState', false, { root: true })

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerces', [])
            })
        })
    },

    getPaymentTypeById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            PaymentTypeService.getById(id).then(({ data }) => {
                const paymentType = data.payload

                commit('setPaymentType', paymentType)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createPaymentType({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            PaymentTypeService.create(body).then(({ data }) => {
                const paymentType = Object.assign({}, data.payload)

                commit('setPaymentType', paymentType)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updatePaymentType({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            PaymentTypeService.update(body).then(({ data }) => {
                const paymentType = Object.assign({}, data.payload)

                commit('setPaymentType', paymentType)
                dispatch('loading/loadingState', false, { root: true })
                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removePaymentType({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            PaymentTypeService.remove(id).then(({ data }) => {
                const index = state.paymentTypes.findIndex(x => x.id === id)
                const paymentType = [...state.paymentTypes]
                paymentType.splice(index, 1)

                commit('setPaymentTypes', paymentType)
                dispatch('loading/loadingState', false, { root: true })
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
    getPaymentTypes: state => {
        return state.paymentTypes
    },
    getPaymentType: state => {
        return state.paymentTypes
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}