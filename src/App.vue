<template>
  <div id="app">
    <VHeader v-if="!logged"></VHeader>
    <HeaderUser v-if="logged"></HeaderUser>
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
  data() {
    return {
      logged: '',
    }
  },
  mounted() {
    this.logged = localStorage.getItem('logged');
  }
}
</script>

<style>
@import url('/css/fonts.css');
</style>
