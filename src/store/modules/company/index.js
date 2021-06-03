import CompanyService from '@/services/company'

const state = {
    companies: [],
    company: {},

}


const mutations = {
    setCompanies(state, companies) {
        state.companies = companies
    },
    setCompany(state, company) {
        state.company = company
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}


const actions = {
    getCompaniesData({ commit }) {
        return new Promise((resolve, reject) => {
            CompanyService.all().then(({ data }) => {
                const companies = data.payload

                commit('setCompanies', companies)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompanies', [])
            })
        })
    },

    getCompanyById({ commit }, id) {
        return new Promise((resolve, reject) => {
            CompanyService.getById(id).then(({ data }) => {
                const company = data.payload

                commit('setCompany', company)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceType', {})
            })
        })
    },

    createCompany({ commit }, body) {
        return new Promise((resolve, reject) => {
            CompanyService.create(body).then(({ data }) => {
                const companies = Object.assign({}, data.payload)

                commit('setCompanies', companies)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypes', {})
            })
        })
    },
    updateCompany({ commit }, body) {
        return new Promise((resolve, reject) => {
            CompanyService.update(body).then(({ data }) => {
                const company = Object.assign({}, data.payload)

                commit('setCompany', company)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeCompany({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            CompanyService.remove(id).then(({ data }) => {
                const index = state.companies.findIndex(x => x.id === id)
                const companies = [...state.companies]
                companies.splice(index, 1)

                commit('setCompanies', companies)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCommerceTypess', {})
            })
        })
    }
}
const getters = {
    getCompanies: state => {
        return state.companies
    },
    getCompany: state => {
        return state.company
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}