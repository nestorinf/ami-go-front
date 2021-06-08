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
    getPaymentTypesData({ commit }) {
        return new Promise((resolve, reject) => {
            PaymentTypeService.all().then(({ data }) => {
                const paymentTypes = data.payload

                commit('setPaymentTypes', paymentTypes)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerces', [])
            })
        })
    },

    getPaymentTypeById({ commit }, id) {
        return new Promise((resolve, reject) => {
            PaymentTypeService.getById(id).then(({ data }) => {
                const paymentType = data.payload

                commit('setPaymentType', paymentType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createPaymentType({ commit }, body) {
        return new Promise((resolve, reject) => {
            PaymentTypeService.create(body).then(({ data }) => {
                const paymentType = Object.assign({}, data.payload)

                commit('setPaymentType', paymentType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updatePaymentType({ commit }, body) {
        return new Promise((resolve, reject) => {
            PaymentTypeService.update(body).then(({ data }) => {
                const paymentType = Object.assign({}, data.payload)

                commit('setPaymentType', paymentType)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removePaymentType({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            PaymentTypeService.remove(id).then(({ data }) => {
                const index = state.paymentTypes.findIndex(x => x.id === id)
                const paymentType = [...state.paymentTypes]
                paymentType.splice(index, 1)

                commit('setPaymentTypes', paymentType)

                resolve(data.payload)
            }).catch(err => {

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