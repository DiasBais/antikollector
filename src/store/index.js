import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import lang from './modules/lang'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loading,
        lang
    }
})
