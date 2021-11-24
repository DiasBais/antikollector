<template>
  <div class="">
    <div class="headeruser">
      <div class="headeruser__main">
        <div class="headeruser__main-center">
          <div class="headeruser__links">
            <ul class="headeruser__list-links">
              <li class="headeruser__link" v-for="(link, index) in links" :key="'A'+index">
                <router-link :to="link.path" :style="(($route.path === link.path)?'color: #753636':'')">
                  {{ link.title }}
                  <div v-if="numRequests && link.path === 'notifications'">{{ numRequests }}</div>
                </router-link>
              </li>
            </ul>
            <div class="headeruser__lang" @click="choiceLanguages()">KZ | RU</div>
          </div>
          <!-- Моб версия -->
          <div class="headeruser__mobile-links">
            <div class="headeruser__mobile-icon" @click="openMobileNav()" :style="'left: '+mobileNavBgLeft"></div>
            <div class="headeruser__mobile-bg" @click="closeMobileNav()" :style="'left: '+mobileNavLeft"></div>
            <div class="headeruser__mobile" :style="'left: '+mobileNavLeft">
              <div class="headeruser__mobile-nav">
                <div class="headeruser__mobile-lang" @click="choiceLanguages()">KZ | RU</div>
                <div class="headeruser__mobile-links-nav">
                  <ul class="headeruser__mobile-list-links">
                    <li class="headeruser__mobile-link" v-for="(link, index) in links" :key="'B'+index">
                      <router-link :to="link.path" :style="(($route.path === link.path)?'font-weight: bold':'')">
                        {{ link.title }}
                        <div v-if="link.path === 'notifications'">+1</div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="headeruser__mobile-links-SN">
                <div class="headeruser__mobile-link-instagram">
                  <img src="/images/instagram.svg">
                </div>
                <div class="headeruser__mobile-link-facebook">
                  <img src="/images/facebook.svg">
                </div>
              </div>
            </div>
          </div>
          <!-- --- -->
          <div class="headeruser__account-circle">
            <img src="/images/account-circle.svg" v-on:click="logout">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import choiceLanguagesRu from '../lang/ru/lang'
import choiceLanguagesKz from '../lang/kz/lang'
const axios = require('axios');

export default {
  data () {
    return {
      numRequests: 0,
      links: [
        { path: 'myDocuments', title: 'Мои документы' },
        { path: 'notifications', title: 'Уведомления' },
        { path: '/step2show', title: 'Заказать услугу' },
      ],
      lang: {
        choice: 'ru',
        data: choiceLanguagesRu()
      },
      mobileNavBgLeft: '0px',
      mobileNavLeft: '0px',
      token: '',
      error: '',
    }
  },
  created() {
    this.initialValueMobileNav();
    window.addEventListener('resize', this.initialValueMobileNav);
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.getPush();
  },
  methods: {
    async logout() {
      await localStorage.setItem('iin', '');
      await localStorage.setItem('token', '');
      await localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    },
    async getPush() {
      await axios.post('https://crediter.kz/api/getPush', {
        'token': this.token,
      })
          .then(response => {
            if (response.data.success) {
              this.numRequests = response.data.data.length;
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
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
