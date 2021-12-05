export default {
    actions: {},
    mutations: {
        SET_LANG(state, data) {
            state.content = {
                ...state.content,
                uk: data,
            };
        }
    },
    state: {
        content: {
            // kz: import('/lang/kz/lang.js'),
            // ru: import('/lang/ru/lang.js'),
            kz: 'sdvgedvaesvads',
            ru: 'advaesvaqevbdsav',
        }
    },
    getters: {
        getLang(state) {
            return state.content;
        }
    },
}
