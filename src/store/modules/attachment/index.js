
import AttachmentService from '@/services/attachment'

const state = {}


const mutations = {}


const actions = {
   
    removeAttachment({ dispatch  }, id) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            AttachmentService.remove(id).then(({ data }) => {
                dispatch('loading/loadingState', false, { root: true })

                resolve(data.payload)
            }).catch(err => {
                dispatch('loading/loadingState', false, { root: true })
                reject(err)
            })
        })
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}