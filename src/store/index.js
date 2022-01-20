import Vue from 'vue'
import Vuex from 'vuex'
import organizations from './modules/organizations'
import loading from './modules/loading'
import lang from './modules/lang'
import logged from './modules/logged'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loading,
        lang,
        logged,
        organizations,
    }
})
