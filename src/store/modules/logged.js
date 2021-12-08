export default {
    actions: {},
    mutations: {
        START_LOGGED_VALUE(state) {
            state.logged = localStorage.getItem('logged');
        },
        SET_LOGGED(state, data) {
            state.logged = data;
            localStorage.setItem('logged', data);
        }
    },
    state: {
        logged: false,
    },
    getters: {
        getLogged(state) {
            return state.logged;
        }
    },
}
