<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <div class="loading" :style="'right: '+(loading?'0px':'-60px')">
      <LoadingImage></LoadingImage>
    </div>
    <VFooter v-if="hideFooter"></VFooter>
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
      router: '',
      hideFooter: true,
    }
  },
  state () {
    return {
      loading: false,
    }
  },
  mounted () {
    this.$store.commit('START_LOGGED_VALUE',);
    this.checkRouter();
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading',
      storageLogged: 'getLogged',
    })
  },
  watch: {
    storageLogged: function () {
      this.logged = this.storageLogged;
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
        this.hideFooter = true;
      }
    }
  },
}
</script>

<style>
@import url('/css/looper.css');
@import url('/css/fonts.css');
@import url('/css/main.css');
</style>
