<template>
    <div class="">
        <div class="header">
            <div class="header__main">
                <div class="header__main-center">
                    <div class="header__links">
                        <ul class="header__list-links">
                            <li class="header__link" v-for="(link, index) in links" :key="'A'+index">
                                <router-link :to="link.path" :style="(($route.path === link.path)?'color: #753636':'')">
                                  {{ link.title }}
                                </router-link>
                            </li>
                        </ul>
                        <div class="header__lang" @click="choiceLanguages()">KZ | RU</div>
                    </div>
                    <!-- Моб версия -->
                    <div class="header__mobile-links">
                        <div class="header__mobile-icon" @click="openMobileNav()" :style="'left: '+mobileNavBgLeft"></div>
                        <div class="header__mobile-bg" @click="closeMobileNav()" :style="'left: '+mobileNavLeft"></div>
                        <div class="header__mobile" :style="'left: '+mobileNavLeft">
                            <div class="header__mobile-nav">
                                <div class="header__mobile-lang" @click="choiceLanguages()">KZ | RU</div>
                                <div class="header__mobile-links-nav">
                                    <ul class="header__mobile-list-links">
                                        <li class="header__mobile-link" v-for="(link, index) in links" :key="'B'+index">
                                            <router-link :to="link.path" :style="(($route.path === link.path)?'font-weight: bold':'')">
                                              {{ link.title }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="header__mobile-links-SN">
                                <div class="header__mobile-link-instagram">
                                    <img src="/images/instagram.svg">
                                </div>
                                <div class="header__mobile-link-facebook">
                                    <img src="/images/facebook.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- --- -->
                    <div class="header__account-circle" @click="obfLoginBlockAlertOpen">
                        <img src="/images/account-circle.svg">
                    </div>
                </div>
            </div>
        </div>
        <Login ref="loginBlockAlerts" />
    </div>
</template>

<script>
import choiceLanguagesRu from '../lang/ru/lang'
import choiceLanguagesKz from '../lang/kz/lang'
import Login from './block/login';


export default {
    components: {
      Login,
    },
    data () {
        return {
            links: [
                { path: '/', title: 'Главная страница' },
                { path: '/our-advantages', title: 'Наши преимущества' },
                { path: '/services', title: 'Услуги' },
                { path: '/about-company', title: 'О компании' },
                { path: '/reviews', title: 'Отзывы' },
                { path: '/faq', title: 'FAQ' },
            ],
            sliders: [
                { src: './images/megaphone-2.svg', description: 'Вас беспокоят звонками и угрозами?' },
                { src: './images/cctv-2.svg', description: 'Вас приследует у работы и дома коллекторы?' },
                { src: './images/morally-pressured.svg', description: 'На Вас оказывают моральное давление?' },
                { src: './images/credit-card.svg', description: 'Ваши счета заблокировали?' },
                { src: './images/accounts-blocked.svg', description: 'Вам выплачивают зп с удержаниями?' },
                { src: './images/accounts-blocked.svg', description: 'Вам испортили кредитную историю?' },
            ],
            mouseDown: { pressed: 0, lastPosLeft: 0, cursor: 'grab' },
            mouseMotion: 0,
            sliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            oldSliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            lang: {
                choice: 'ru',
                data: choiceLanguagesRu()
            },
            mobileNavBgLeft: '0px',
            mobileNavLeft: '0px'
        }
    },
    created () {
        this.headerInitialValueMobileNav();
        window.addEventListener('resize', this.headerInitialValueMobileNav);
    },
    methods: {
      headerInitialValueMobileNav() {
            this.mobileNavBgLeft = -(0.7786*window.innerWidth)+'px';
            this.mobileNavLeft = (-window.innerWidth)+'px';
        },
        openMobileNav() {
            this.mobileNavBgLeft = '0px';
            this.mobileNavLeft = '0px';
        },
        closeMobileNav() {
            this.mobileNavBgLeft = -(0.7786*window.innerWidth)+'px';
            this.mobileNavLeft = (-window.innerWidth)+'px';
        },
        choiceLanguages() {
            if (this.lang.choice === 'ru') {
                this.lang.choice = 'kz';
                this.lang.data = choiceLanguagesKz();
            } else {
                this.lang.choice = 'ru';
                this.lang.data = choiceLanguagesRu();
            }
        },
        changePosSlider(index) {
            console.log(index);
            // this.sliderMargin = { top: 'auto', left: (), bottom: 'auto', right: 'auto' };
        },
        sliderMouseDown(event) {
            this.mouseDown.pressed = 1;
            this.mouseDown.cursor = 'grabbing';
            let oldPosLeft = this.mouseDown.lastPosLeft;
            console.log(oldPosLeft, event.clientX);
            this.mouseDown.lastPosLeft = (event.clientX);
        },
        sliderMouseUp() {
            if (this.mouseDown.pressed === 1) {
                this.mouseDown.cursor = 'grab';
                this.oldSliderMargin = this.sliderMargin;
                this.mouseDown.pressed = 0;
            }
        },
        sliderMouseMotionMove(event) {
            if (this.mouseDown.pressed) {
                let lastPosLeft = this.mouseDown.lastPosLeft;
                let posX = event.clientX;
                let newValue = (this.oldSliderMargin.left + lastPosLeft - posX);
                this.sliderMargin = { top: 'auto', left: newValue, bottom: 'auto', right: 'auto' };
            }
        },
        sliderMouseMotionLeave() {
            if (this.mouseDown.pressed === 1) {
                this.mouseDown.cursor = 'grab';
                this.oldSliderMargin = this.sliderMargin;
                this.mouseDown.pressed = 0;
            }
        },
        obfLoginBlockAlertOpen() {
          this.$refs.loginBlockAlerts.LoginBlockAlertOpen();
        },
    },
}
</script>

<style>
@import '/./css/header.css'
</style>
