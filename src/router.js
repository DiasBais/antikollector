import VueRouter from 'vue-router'

import firstPage from './components/firstPage'
import Banner from './components/Banner'
import Desktop2 from './components/Desktop2'
import Desktop4 from './components/Desktop4'
import Desktop5 from './components/Desktop5'
import Desktop6 from './components/Desktop6'
import aboutCompany from './components/aboutCompany'
import Desktop7 from './components/Desktop7'
import blockAlert from './components/blockAlert'
import login from './components/block/login'
import register from './components/block/register'
import step1 from './components/block/step1'
import step2 from './components/block/step2'
import step3 from './components/block/step3'
import step4 from './components/block/step4'
import HeaderUser from './components/HeaderUser'
import myDocuments from './components/myDocuments'
import Notifications from './components/Notifications'
import confirm from './components/block/confirm'
import LoginShow from './components/block/LoginShow'
import step1Show from './components/block/Step1Show'
import step2Show from './components/block/Step2Show'
import step3Show from './components/block/Step3Show'
import ConfirmShow from './components/block/ConfirmShow'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: firstPage
        },
        {
            path: '/banner',
            component: Banner
        },
        {
            path: '/desktop2',
            component: Desktop2
        },
        {
            path: '/desktop4',
            component: Desktop4
        },
        {
            path: '/desktop5',
            component: Desktop5
        },
        {
            path: '/desktop6',
            component: Desktop6
        },
        {
            path: '/aboutCompany',
            component: aboutCompany
        },
        {
            path: '/desktop7',
            component: Desktop7
        },
        {
            path: '/blockAlert',
            component: blockAlert
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/register',
            component: register
        },
        {
            path: '/step1',
            component: step1
        },
        {
            path: '/step2',
            component: step2
        },
        {
            path: '/step3',
            component: step3
        },
        {
            path: '/step4',
            component: step4
        },
        {
            path: '/LoginShow',
            component: LoginShow
        },
        {
            path: '/step1Show',
            component: step1Show
        },
        {
            path: '/step2Show',
            component: step2Show
        },
        {
            path: '/step3Show',
            component: step3Show
        },
        {
            path: '/ConfirmShow',
            component: ConfirmShow
        },
        {
            path: '/headeruser',
            component: HeaderUser
        },
        {
            path: '/myDocuments',
            component: myDocuments
        },
        {
            path: '/Notifications',
            component: Notifications
        },
        {
            path: '/confirm',
            component: confirm
        },
    ]
})

