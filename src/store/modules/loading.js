export default {
    actions: {},
    mutations: {
        SET_LOADING(state, data) {
            state.loading = data;
        }
    },
    state: {
        loading: false,
    },
    getters: {
        getLoading(state) {
            return state.loading;
        }
    },
}
