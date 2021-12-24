<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <div class="loading" :style="'right: '+(loading?'0px':'-60px')">
      <LoadingImage></LoadingImage>
    </div>
    <div :class="'questions '+(openedLinks?'':'questions__closed')">
      <div class="questions__OpenClose" v-on:click="closeLinks">
        <div class="questions__OpenCloseContent">
          <div class="questions__OpenCloseItem"></div>
          <div class="questions__OpenCloseItem"></div>
          <div class="questions__OpenCloseItem"></div>
        </div>
      </div>
      <div class="questions__content">
        <a class="questions__youtube-icon" :href="linkYoutube" target="_blank">
          <img src="/images/icons/youtube.png">
        </a>
        <a class="questions__facebook-icon" :href="linkFacebook" target="_blank">
          <img src="/images/icons/facebook.png">
        </a>
        <a :href="linkInstagram" target="_blank">
          <img class="questions__instagram-icon" src="/images/icons/instagram.webp">
        </a>
        <a :href="linkVK" target="_blank">
          <img class="questions__vk-icon" src="/images/icons/vk.png">
        </a>
        <a class="questions__whatsapp-icon" :href="linkWhatsapp" target="_blank">
          <img src="/images/icons/whatsapp.png">
        </a>
        <router-link class="questions__questions-icon" :to="'faq'" target="_blank">?</router-link>
      </div>
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
      openedLinks: true,
      router: '',
      hideFooter: true,
      linkInstagram: 'https://instagram.com/antikollector.kz.1',
      linkFacebook: 'https://www.facebook.com/profile.php?id=100075993963375',
      linkWhatsapp: 'https://wa.me/+77003505000',
      linkVK: 'https://vk.com/id694737943',
      linkYoutube: 'https://www.youtube.com/channel/UCzDhXZXUWDx1k_pbmX4WNHA',
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
    closeLinks() {
      if (this.openedLinks) this.openedLinks = false;
      else this.openedLinks = true;
    },
    checkRouter() {
      this.router = this.$route.path.toLowerCase();
      if (this.router === '/login' ||
          this.router === '/step-1' ||
          this.router === '/step-2' ||
          this.router === '/step-3' ||
          this.router === '/step-4' ||
          this.router === '/step-5' ||
          this.router === '/confirm' ||
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
        this.footer = this.storageFooter;
        this.checkRouter();
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
