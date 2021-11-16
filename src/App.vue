<template>
  <div id="app">
    <VHeader></VHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from './components/Header'

export default {
  components: {
    VHeader
  }
}
</script>

<style>
@import url('/css/fonts.css');
</style>
