<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <div class="loading" :style="'right: '+(loading?'0px':'-60px')">
      <LoadingImage></LoadingImage>
    </div>
    <div class="questions">
      <a class="facebook-icon" :href="linkFacebook">
        <img src="/images/icons/facebook.png">
      </a>
      <a :href="linkInstagram">
        <img class="instagram-icon" src="/images/icons/instagram.webp">
      </a>
      <a :href="linkVK">
        <img class="vk-icon" src="/images/icons/vk.png">
      </a>
      <a class="whatsapp-icon" :href="linkWhatsapp">
        <img src="/images/icons/whatsapp.png">
      </a>
      <router-link class="questions-icon" :to="'faq'">?</router-link>
    </div>
    <VFooter v-if="footer"></VFooter>
  </div>
</template>

<script>
import VHeader from './components/header'
import HeaderUser from './components/user/header'
import VFooter from './components/footer'
import {MikePad} from 'vue-loading-spinner'
import { mapGetters } from 'vuex';

export default {
  components: {
    VHeader,
    HeaderUser,
    VFooter,
    LoadingImage: MikePad,
  },
  data () {
    return {
      logged: false,
      footer: false,
      router: '',
      hideFooter: true,
      linkInstagram: 'https://instagram.com/antikollector.kz.1',
      linkFacebook: 'https://www.facebook.com/profile.php?id=100075993963375',
      linkWhatsapp: 'https://wa.me/+77003505000',
      linkVK: 'https://vk.com/id694737943',
    }
  },
  state () {
    return {
      loading: false,
    }
  },
  mounted () {
    let checkPathPayMent = '/?v=e0f51fc098220d9b7aaa0549b2022128&utm_source=doaff&utm_medium=affiliate&utm_campaign=doaff&web_id=_hICYFw--&utm_content=doaff';
    if (checkPathPayMent === this.$route.fullPath) {

      let paymentLink = localStorage.getItem('paymentLink');
      if (!localStorage.getItem('token') && !localStorage.getItem('logged')) {
        localStorage.setItem('token', '');
        this.$store.commit('SET_LOGGED','');
      }
      else if (paymentLink) {
        document.location.href = paymentLink;
      }
      else {
        this.$router.push({path: '/step-3'});
      }

    }
    this.$store.commit('START_LOGGED_VALUE');
    this.checkRouter();
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading',
      storageFooter: 'getFooter',
      storageLogged: 'getLogged',
    })
  },
  watch: {
    storageLogged: function () {
      this.logged = this.storageLogged;
      this.checkRouter();
    },
    storageFooter: function () {
      this.footer = this.storageFooter;
      this.checkRouter();
    },
  },
  methods: {
    checkRouter() {
      this.router = this.$route.path.toLowerCase();
      if (this.router === '/login' ||
          this.router === '/step-1' ||
          this.router === '/step-2' ||
          this.router === '/step-3' ||
          this.router === '/step-4' ||
          this.router === '/step-5' ||
          this.router === '/forgot-password'
      ) {
        this.hideFooter = false;
      }
      // else if (this.router === '/telegrambot') {
      //   document.body.innerHTML = '';
      // }
      else {
        this.$store.commit('SET_FOOTER', true);
        this.hideFooter = true;
      }
    }
  },
}
</script>

<style>
body { padding: 0px; margin: 0px; }
#app { padding: 0px; margin: 0px; }
@import url('/css/looper.css');
@import url('/css/fonts.css');
@import url('/css/main.css');
</style>
