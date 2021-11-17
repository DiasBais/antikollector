<template>
  <div id="app">
    <VHeader></VHeader>
    <router-view></router-view>
    <VFooter></VFooter>
  </div>
</template>

<script>
import VHeader from './components/Header'
import VFooter from './components/Desktop7'

export default {
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style>
@import url('/css/fonts.css');
</style>
