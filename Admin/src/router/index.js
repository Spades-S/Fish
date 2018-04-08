import Vue from 'vue'
import Router from 'vue-router'

import Result from '../components/Result.vue'
import Login from '../components/Login.vue'
import Header from '../components/Header.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Results',
            components: {
                default: Result,
                function: Header
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            props: { isLogin: true }
        }, {
            path: '/chpsw',
            name: 'ChPSW',
            component: Login,
            props: {
                isLogin: false
            }

        }
    ]
})
