<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-else></HeaderUser>
    <router-view></router-view>
    <VFooter></VFooter>
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
    }
  },
  mounted () {
    this.logged = localStorage.getItem('logged');
    this.$el.addEventListener('click', this.onClick);
  },
  methods: {
    onClick() {
      this.logged = localStorage.getItem('logged');
    }
  },
}
</script>

<style>
@import url('/css/fonts.css');
</style>
