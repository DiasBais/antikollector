<template>
  <div class="">
    <div class="headerLogged">
      <div class="headerLogged__main">
        <div class="headerLogged__main-center">
          <div class="headerLogged__links">
            <ul class="headerLogged__list-links">
              <li class="headerLogged__link" v-for="(link, index) in links" :key="'A'+index">
                <router-link :to="link.path" :style="(($route.path === link.path)?'color: #753636':'')">
                  {{ link.title }}
                  <div v-if="numRequests && link.path === 'notifications'">{{ numRequests }}</div>
                </router-link>
              </li>
            </ul>
            <div class="headerLogged__lang" @click="choiceLanguages()">KZ | RU</div>
          </div>
          <!-- Моб версия -->
          <div class="headerLogged__mobile-links">
            <div class="headerLogged__mobile-icon" @click="openMobileNav()" :style="'left: '+mobileNavBgLeft"></div>
            <div class="headerLogged__mobile-bg" @click="closeMobileNav()" :style="'left: '+mobileNavLeft"></div>
            <div class="headerLogged__mobile" :style="'left: '+mobileNavLeft">
              <div class="headerLogged__mobile-nav">
                <div class="headerLogged__mobile-lang" @click="choiceLanguages()">KZ | RU</div>
                <div class="headerLogged__mobile-links-nav">
                  <ul class="headerLogged__mobile-list-links">
                    <li class="headerLogged__mobile-link" v-for="(link, index) in links" :key="'B'+index">
                      <router-link :to="link.path" :style="(($route.path === link.path)?'font-weight: bold':'')">
                        {{ link.title }}
                        <div v-if="link.path === 'notifications'">+1</div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="headerLogged__mobile-links-SN">
                <div class="headerLogged__mobile-link-instagram">
                  <img src="/images/instagram.svg">
                </div>
                <div class="headerLogged__mobile-link-facebook">
                  <img src="/images/facebook.svg">
                </div>
              </div>
            </div>
          </div>
          <!-- --- -->
          <div class="headerLogged__account-circle">
            <img src="/images/account-circle.svg" v-on:click="logout">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import choiceLanguagesRu from '../../lang/ru/lang'
import choiceLanguagesKz from '../../lang/kz/lang'
const axios = require('axios');

export default {
  data () {
    return {
      numRequests: 0,
      links: [
        { path: 'notifications', title: 'Уведомления' },
        { path: '/step-2', title: 'Заказать услугу' },
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
      await localStorage.setItem('token', '');
      this.$store.commit('SET_LOGGED','');
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
@import '/./css/headerLogged.css';
</style>
