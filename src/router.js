import VueRouter from 'vue-router'

import firstPage from './components/firstPage'
import Banner from './components/Banner'
import protectionAgainstCollectors from './components/protectionAgainstCollectors'
import ourAdvantages from './components/ourAdvantages'
import stock from './components/stock'
import reviews from './components/reviews'
import aboutCompany from './components/aboutCompany'
import Desktop7 from './components/Desktop7'
import HeaderUser from './components/HeaderUser'
import myDocuments from './components/myDocuments'
import Notifications from './components/Notifications'
import LoginShow from './components/block/LoginShow'
import step1Show from './components/block/Step1Show'
import step2Show from './components/block/Step2Show'
import step3Show from './components/block/Step3Show'
import ConfirmShow from './components/block/ConfirmShow'
import forgotPassword from './components/block/forgotPassword'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: firstPage,
            title: 'sfgsdf'
        },
        {
            path: '/banner',
            component: Banner
        },
        {
            path: '/protectionAgainstCollectors',
            component: protectionAgainstCollectors
        },
        {
            path: '/ourAdvantages',
            component: ourAdvantages
        },
        {
            path: '/stock',
            component: stock
        },
        {
            path: '/reviews',
            component: reviews
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
            path: '/forgotPassword',
            component: forgotPassword
        },
    ]
})

