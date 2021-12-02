import VueRouter from 'vue-router'

import main from './components/main'
import myDocuments from './components/user/myDocuments'
import notifications from './components/user/notifications'
import login from './components/block/login'
import register from './components/block/register'
import step1 from './components/block/step1'
import step2 from './components/block/step2'
import step3 from './components/block/step3'
import step4 from './components/block/step4'
import confirm from './components/block/confirm'
import forgotPassword from './components/block/forgotPassword'
import faq from './components/faq'
import faq2 from './components/faq2'
import reviews from './components/reviews'
import protectionAgainstCollectors from './components/protectionAgainstCollectors'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: main
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
        {
            path: '/faq',
            component: faq2
        },
        {
            path: '/faq2',
            component: faq
        },
        {
            path: '/reviews',
            component: reviews
        },
        {
            path: '/protectionAgainstCollectors',
            component: protectionAgainstCollectors
        },
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to,from);
    document.title = 'Антиколлектор |';
    if (to.path === '/') document.title += ' Главная страница';
    else if (to.path === '/login') document.title += ' Авторизация';
    else if (to.path === '/register') document.title += ' Регистрация';
    else if (to.path === '/step-1') document.title += ' Шаг 1 | Регистрация';
    else if (to.path === '/confirm') document.title += ' Подтверждение телефона';
    else if (to.path === '/step-2') document.title += ' Шаг 2 | Заказать услугу';
    else if (to.path === '/step-3') document.title += ' Шаг 3 | Подтверждение условий';
    else if (to.path === '/step-4') document.title += ' Шаг 4 | Оплата';
    else if (to.path === '/my-documents') document.title += ' Мои документы';
    else if (to.path === '/notifications') document.title += ' Уведомление';
    else if (to.path === '/forgot-password') document.title += ' Восстановление аккаунта';
    else if (to.path === '/faq') document.title += ' Часто задаваемые вопросы';
    else document.title += ' not found'
    next();
})

export default router
