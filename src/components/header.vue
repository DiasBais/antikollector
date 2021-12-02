<template>
    <div class="">
        <div class="header">
            <div class="header__main">
                <div class="header__main-center">
                    <div class="header__links">
                        <ul class="header__list-links">
                            <li class="header__link" v-for="(link, index) in links" :key="'A'+index" v-on:click="onClickHeader($event,link)">
                                <router-link :to="((link.path==='/faq')?link.path:(($route.path==='/')?('#'+(link.path.slice(1,link.path.length))):'/'))"
                                             :style="(($route.path === link.path)?'color: #753636':'')"
                                >
                                  {{ link.title }}
                                </router-link>
                            </li>
                        </ul>
                        <div class="header__lang" @click="choiceLanguages()">KZ | RU</div>
                    </div>
                    <!-- Моб версия -->
                    <div class="header__mobile-links">
                        <div class="header__mobile-icon" @click="openMobileNav()"></div>
                        <div class="header__mobile-bg" @click="closeMobileNav()" :style="'width: '+mobileNavBgWidth"></div>
                        <div class="header__mobile" :style="'width: '+mobileNavWidth">
                            <div class="header__mobile-content" :style="'display: '+mobileNavDisplay">
                                <div class="header__mobile-nav">
                                    <div class="header__mobile-lang" @click="choiceLanguages()">KZ | RU</div>
                                    <div class="header__mobile-links-nav">
                                        <ul class="header__mobile-list-links">
                                            <li class="header__mobile-link" v-for="(link, index) in links" :key="'B'+index" v-on:click="onClickHeader($event,link)">
                                                <router-link :to="((link.path==='/faq')?link.path:(($route.path==='/')?('#'+(link.path.slice(1,link.path.length))):'/'))"
                                                             :style="(($route.path === link.path)?'font-weight: bold':'')"
                                                >
                                                    {{ link.title }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="header__mobile-links-SN">
                                    <a :href="linkInstagram" class="header__mobile-link-instagram">
                                        <img src="/images/instagram.svg">
                                    </a>
                                    <a :href="linkFacebook" class="header__mobile-link-facebook">
                                        <img src="/images/facebook.svg">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- --- -->
                    <div class="header__account-circle">
                        <router-link to="/login">
                          <img src="/images/account-circle.svg">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import choiceLanguagesRu from '../lang/ru/lang'
import choiceLanguagesKz from '../lang/kz/lang'


export default {
    data () {
        return {
            links: [
                { path: '/', title: 'Главная страница', here: { original: 0, mobile: 0 } },
                { path: '/our-advantages', title: 'Наши преимущества', here: { original: 1834, mobile: 1433 } },
                { path: '/services', title: 'Услуги', here: { original: 650, mobile: 565 } },
                { path: '/about-company', title: 'О компании', here: { original: 4491, mobile: 3703 } },
                { path: '/reviews', title: 'Отзывы', here: { original: 3556, mobile: 2413 } },
                { path: '/faq', title: 'Часто задаваемые вопросы', here: { original: 5553, mobile: 4795 } },
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
            mobileNavBgWidth: '0px',
            mobileNavWidth: '0px',
            mobileNavDisplay: 'none',
            listHeightPages: {
              home: 0,
              ourAdvantages: 0,
              services: 0,
              aboutCompany: 0,
              reviews: 0,
              faq: 0,
            },
            linkInstagram: '/',
            linkFacebook: '/',
        }
    },
    methods: {
      /* MOBILE VERSION */
        onClickHeader(e,link) {
          e.preventDefault();
          if (this.$route.path === '/') {
            if (window.innerWidth < 1160) window.scrollBy(0,link.here.mobile);
            else window.scrollBy(0,link.here.original);
          }
          else window.scroll(0, 200);
        },
        /* MOBILE NAV */
        openMobileNav() {
            this.mobileNavBgWidth = '100%';
            this.mobileNavWidth = '77.86%';
            setTimeout(()=>{this.mobileNavDisplay = 'grid';},500);
        },
        closeMobileNav() {
            this.mobileNavDisplay = 'none';
            this.mobileNavBgWidth = '0px';
            this.mobileNavWidth = '0px';
        },
        /* Translate */
        choiceLanguages() {
            if (this.lang.choice === 'ru') {
                this.lang.choice = 'kz';
                this.lang.data = choiceLanguagesKz();
            } else {
                this.lang.choice = 'ru';
                this.lang.data = choiceLanguagesRu();
            }
        },
        /* SLIDER */
        sliderMouseDown(event) {
            this.mouseDown.pressed = 1;
            this.mouseDown.cursor = 'grabbing';
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
        /* SLIDER END */
    },
}
</script>

<style>
@import '/./css/header.css'
</style>

