/***
 *  created by Spades <spadesge@gmail.com> 18/04/06
 */
import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false



new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})






