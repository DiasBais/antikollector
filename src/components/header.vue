<template>
    <div class="">
        <div class="header">
            <div class="header__main">
                <div class="header__main-center">
                    <div class="header__links">
                        <ul class="header__list-links">
                            <li class="header__link"
                                v-for="(link, index) in links.path"
                                :key="'A'+index"
                                v-on:click="onClickHeader($event,index)"
                            >
                                <router-link :to="((link==='/faq')?link:(($route.path==='/')?('#'+(link.slice(1,link.length))):'/'))"
                                             :style="(($route.path === link)?'color: #753636':'')"
                                >
                                  {{ links.title[index] }}
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
                                            <li class="header__mobile-link"
                                                v-for="(link, index) in links.path"
                                                :key="'B'+index"
                                                v-on:click="onClickHeader($event,index)"
                                            >
                                                <router-link :to="((link==='/faq')?link:(($route.path==='/')?('#'+(link.slice(1,link.length))):'/'))"
                                                             :style="(($route.path === link)?'font-weight: bold':'')"
                                                >
                                                    {{ links.title[index] }}
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
import { mapGetters } from 'vuex';


export default {
    data () {
        return {
            links: {
              path: [
                  '/',
                  '/our-advantages',
                  '/services',
                  '/about-company',
                  '/reviews',
                  '/faq',
              ],
              title: [
                  'Главная страница',
                  'Наши преимущества',
                  'Услуги',
                  'О компании',
                  'Отзывы',
                  'Часто задаваемые вопросы',
              ],
              here: [
                { original: 0, mobile: 0 },
                { original: 1834, mobile: 1433 },
                { original: 650, mobile: 565 },
                { original: 4491, mobile: 3703 },
                { original: 3556, mobile: 2413 },
                { original: 0, mobile: 0 },
              ],
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
            linkInstagram: 'https://instagram.com/antikollector.kz.1',
            linkFacebook: 'https://www.facebook.com/profile.php?id=100075993963375',
        }
    },
    computed: {
      ...mapGetters({
        dataLang: 'getLang',
      }),
    },
    watch: {
      dataLang: function () {
        this.lang = this.dataLang;
        this.links.title = this.dataLang.banner.title;
      },
    },
    methods: {
      /* MOBILE VERSION */
        onClickHeader(e,index) {
          e.preventDefault();
          if (this.$route.path === '/') {
            if (window.innerWidth < 1160) window.scrollBy(0,this.links.here[index].mobile);
            else window.scrollBy(0,this.links.here[index].original);
          }
          else window.scroll(0, 0);
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
            this.$store.commit('CHANGE_LANG');
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

