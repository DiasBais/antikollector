<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <VFooter v-if="hideFooter"></VFooter>
  </div>
</template>

<script>
import VHeader from './components/header'
import HeaderUser from './components/user/header'
import VFooter from './components/footer'

export default {
  components: {
    VHeader,
    HeaderUser,
    VFooter
  },
  data () {
    return {
      logged: false,
      router: '',
      hideFooter: true,
    }
  },
  mounted () {
    this.logged = localStorage.getItem('logged');
    this.router = this.$route.path.toLowerCase();
    if (this.router === '/login'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step-1'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step-2'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step-3'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/forgot-password'.toLowerCase()) {
      this.hideFooter = false;
    }
    else {
      this.hideFooter = true;
    }
    this.$el.addEventListener('click', this.onClick);
  },
  methods: {
    onClick() {
      this.logged = localStorage.getItem('logged');
      this.router = this.$route.path.toLowerCase();
      if (this.router === '/login'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step-1'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step-2'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step-3'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/forgot-password'.toLowerCase()) {
        this.hideFooter = false;
      }
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
</style>
