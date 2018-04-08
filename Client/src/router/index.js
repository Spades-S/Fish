import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/Content.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Content
        }, {
            path: '/order',
            name:
                'Index',
            component:
            Content
        }
    ]
})
