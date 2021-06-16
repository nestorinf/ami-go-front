import DepartmentService from '@/services/department'

const state = {
    departments: [],
    department: {},

}


const mutations = {
    setDepartments(state, departments) {
        state.departments = departments
    },
    setDepartment(state, department) {
        state.department = department
    }
}


const actions = {
    getDepartmentsData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            DepartmentService.all().then(({ data }) => {
                const departments = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setDepartments', departments)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setDepartments', [])
            })
        })
    },

    getDepartmentById({ commit, dispatch }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            DepartmentService.getById(id).then(({ data }) => {
                const company = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setDepartment', company)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setDepartmentType', {})
            })
        })
    },

    createDepartment({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            DepartmentService.create(body).then(({ data }) => {
                const department = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setDepartment', department)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setDepartmentTypes', {})
            })
        })
    },
    updateDepartment({ commit, dispatch }, body) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            DepartmentService.update(body).then(({ data }) => {
                const department = Object.assign({}, data.payload)

                dispatch('loading/loadingState', false, { root: true })
                commit('setDepartment', department)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeDepartment({ commit, dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            DepartmentService.remove(id).then(({ data }) => {
                const index = state.departments.findIndex(x => x.id === id)
                const departments = [...state.departments]
                departments.splice(index, 1)

                dispatch('loading/loadingState', false, { root: true })
                commit('setDepartments', departments)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setDepartmentTypess', {})
            })
        })
    }
}
const getters = {
    getDepartments: state => {
        return state.departments
    },
    getDepartment: state => {
        return state.department
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}