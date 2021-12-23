import VueRouter from 'vue-router'

import main from './components/main'
import notifications from './components/user/notifications'
import login from './components/block/login'
import register from './components/block/register'
import step1 from './components/block/step1'
import step2 from './components/block/step2'
import step3 from './components/block/step3'
import step4 from './components/block/step4'
import step5 from './components/block/step5'
import confirm from './components/block/confirm'
import forgotPassword from './components/block/forgotPassword'
import faq from './components/faq'
import faq2 from './components/faq2'
import lang from './components/faq'
import cabinet from './components/user/cabinet'
// import notFound from './components/notFound'

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
            path: '/step-5',
            component: step5
        },
        {
            path: '/confirm',
            component: confirm
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
            path: '/lang',
            component: lang
        },
        {
            path: '/cabinet',
            component: cabinet
        },
        // {
        //     path: '*',
        //     component: notFound
        // },
    ]
})


router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        document.title = 'Антиколлектор - поможем избавится от задолженности, МФО, Банк, ЧСИ, Коллекторы';
        // addMetaTag('description', 'Улучшить кредитную историю, чтобы Вам не отказывали в получении новых кредитов. Возврат комиссии, по договорам банковского займа (кредита). Обезопасить себя от Коллекторов, МФО, Банков, ЧСИ');
        return next();
    }
    else if (to.path === '/login') {
        document.title = 'Авторизация';
        // addMetaTag('description', 'Улучшить кредитную историю, чтобы Вам не отказывали в получении новых кредитов. Возврат комиссии, по договорам банковского займа (кредита). Обезопасить себя от Коллекторов, МФО, Банков, ЧСИ');
    }
    else if (to.path === '/register') {
        document.title = 'Регистрация';
    }
    else if (to.path === '/step-1') {
        document.title = 'Шаг 1 | Регистрация';
        // addMetaTag('description', 'Улучшить кредитную историю, чтобы Вам не отказывали в получении новых кредитов. Возврат комиссии, по договорам банковского займа (кредита). Обезопасить себя от Коллекторов, МФО, Банков, ЧСИ');
    }
    else if (to.path === '/confirm') {
        document.title = 'Подтверждение телефона';
    }
    else if (to.path === '/step-2') {
        document.title = 'Шаг 2 | Заказать услугу';
    }
    else if (to.path === '/step-3') {
        document.title = 'Шаг 3 | Подтверждение условий';
    }
    else if (to.path === '/step-4') {
        document.title = 'Шаг 4 | Оплата';
    }
    else if (to.path === '/step-5') {
        document.title = 'В ожидании';
    }
    else if (to.path === '/notifications') {
        document.title = 'Уведомление';
    }
    else if (to.path === '/forgot-password') {
        document.title = 'Восстановление аккаунта';
    }
    else if (to.path === '/faq') {
        document.title = 'Часто задаваемые вопросы';
        // addMetaTag('description', 'Улучшить кредитную историю, чтобы Вам не отказывали в получении новых кредитов. Возврат комиссии, по договорам банковского займа (кредита). Обезопасить себя от Коллекторов, МФО, Банков, ЧСИ');
    }
    else if (to.path === '/cabinet') {
        document.title = 'Личный кабинет';
    }
    else {
        document.title = 'Not Found';
    }
    next();
})

// function addMetaTag(name, content) {
//     let headMeta = document.createElement('meta');
//     headMeta.name = name;
//     headMeta.content = content;
//     document.head.appendChild(headMeta);
// }

export default router
