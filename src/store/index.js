import Vue from 'vue'
import Vuex from 'vuex';
import user from "./modules/user";
import index from "./modules/index";
import goods from "./modules/goods"
import keywords from "./modules/keywords"
Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {
        user,
        index,
        goods,
        keywords
    }
});

export default store;