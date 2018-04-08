// Created by Spades<spadesge@gmail.com> on 18/04/01

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Col, Row, Pagination, Switch } from 'element-ui'

import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Switch)

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login') {
        let cookieStart = document.cookie.indexOf('TOKEN=')
        if (cookieStart < 0) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }


})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

