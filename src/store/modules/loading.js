export default {
    actions: {},
    mutations: {
        SET_LOADING(state, data) {
            state.loading = data;
        },
        SET_FOOTER(state, data) {
            state.footer = data;
        }
    },
    state: {
        loading: false,
        footer: true,
    },
    getters: {
        getLoading(state) {
            return state.loading;
        },
        getFooter(state) {
            return state.footer;
        }
    },
}
