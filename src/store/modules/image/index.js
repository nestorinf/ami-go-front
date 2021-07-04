import ImageService from '@/services/image'

const state = {
    images: [],
    image: {},

}

const mutations = {
    setImages(state, images) {
        state.images = images
    },
    setImage(state, images) {
        state.images = images
    }
}


const actions = {
    getImagesData({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('loading/loadingState', true, { root: true })
            ImageService.all().then(({ data }) => {
                const images = data.payload

                dispatch('loading/loadingState', false, { root: true })
                commit('setImages', images)

                resolve(data.payload)
            }).catch(err => {

                dispatch('loading/loadingState', false, { root: true })
                reject(err)
                // commit('setImages', [])
            })
        })
    },

    getImageById({ commit }, id) {
        return new Promise((resolve, reject) => {
            ImageService.getById(id).then(({ data }) => {
                const company = data.payload

                commit('setImage', company)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setImageType', {})
            })
        })
    },

    createImage({ commit }, body) {
        return new Promise((resolve, reject) => {
            ImageService.create(body).then(({ data }) => {
                const image = Object.assign({}, data.payload)

                commit('setImage', image)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setImageTypes', {})
            })
        })
    },
    updateImage({ commit }, body) {
        return new Promise((resolve, reject) => {
            ImageService.update(body).then(({ data }) => {
                const image = Object.assign({}, data.payload)

                commit('setImage', image)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setCompany', {})
            })
        })
    },

    removeImage({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            ImageService.remove(id).then(({ data }) => {
                const index = state.images.findIndex(x => x.id === id)
                const image = [...state.images]
                image.splice(index, 1)

                commit('setImage', image)

                resolve(data.payload)
            }).catch(err => {

                reject(err)
                // commit('setImageTypess', {})
            })
        })
    }
}
const getters = {
    getImages: state => {
        return state.images
    },
    getImage: state => {
        return state.image
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}