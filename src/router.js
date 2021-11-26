import VueRouter from 'vue-router'

import main from './components/main'
import myDocuments from './components/user/myDocuments'
import notifications from './components/user/notifications'
import login from './components/block/login'
import step1 from './components/block/step1'
import step2 from './components/block/step2'
import step3 from './components/block/step3'
import step4 from './components/block/step4'
import confirm from './components/block/confirm'
import forgotPassword from './components/block/forgotPassword'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: main,
        },
        {
            path: '/login',
            component: login,
            title: 'Авторизация'
        },
        {
            path: '/step-1',
            component: step1
        },
        {
            path: '/step-2',
            component: step2
        },
        {
            path: '/step-3',
            component: step3
        },
        {
            path: '/step-4',
            component: step4
        },
        {
            path: '/confirm',
            component: confirm
        },
        {
            path: '/my-documents',
            component: myDocuments
        },
        {
            path: '/notifications',
            component: notifications
        },
        {
            path: '/forgot-password',
            component: forgotPassword
        },
    ]
})

