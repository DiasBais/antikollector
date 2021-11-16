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
                  <div v-if="link.path === 'our-advantages'">99</div>
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
                        <div v-if="link.path === 'our-advantages'">+1</div>
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
          <div class="header__account-circle">
            <img src="/images/account-circle.svg">
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
        { path: 'home', title: 'Мои документы' },
        { path: 'our-advantages', title: 'Уведомления' },
        { path: 'services', title: 'Заказать услугу' },
      ],
      lang: {
        choice: 'ru',
        data: choiceLanguagesRu()
      },
      mobileNavBgLeft: '0px',
      mobileNavLeft: '0px'
    }
  },
  created () {
    this.initialValueMobileNav();
    window.addEventListener('resize', this.initialValueMobileNav);
  },
  methods: {
    initialValueMobileNav() {
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
  }
}
</script>

<style>
@import '/./css/headeruser.css'
</style>
