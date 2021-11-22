<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <VFooter v-if="hideFooter"></VFooter>
  </div>
</template>

<script>
import VHeader from './components/Header'
import HeaderUser from './components/HeaderUser'
import VFooter from './components/Desktop7'

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
    if (this.router === '/loginshow'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step1show'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step2show'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/step3show'.toLowerCase()) {
      this.hideFooter = false;
    }
    else if (this.router === '/forgotpassword'.toLowerCase()) {
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
      if (this.router === '/loginshow'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step1show'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step2show'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/step3show'.toLowerCase()) {
        this.hideFooter = false;
      }
      else if (this.router === '/forgotpassword'.toLowerCase()) {
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
@import url('/css/fonts.css');
</style>
