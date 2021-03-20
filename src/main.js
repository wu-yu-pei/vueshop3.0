import "babel-polyfill"; //es6转es5兼容IE
import "url-search-params-polyfill"; //让ie兼容new URLSearchParams()
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import config from './assets/js/conf/config';
import utils from './assets/js/utils'

Vue.config.productionTip = false;

Vue.prototype.$config = config;
// 图片懒加载
Vue.prototype.$utils = utils
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');