<template>
  <div class="myDocuments">
    <div class="myDocuments__document">
      <a href="#" class="myDocuments__document-name">Документ 1</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
    </div>
    <div class="myDocuments__document">
      <a href="#" class="myDocuments__document-name">Документ 2</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
    </div>
    <div class="myDocuments__document">
      <a href="#" class="myDocuments__document-name">Документ 3</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      asd: '',
    }
  },
  created () {
    window.addEventListener('load', () => {
      this.mobileVersion();
    })
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.$refs.infoBlockAlert.clientHeight >= window.innerHeight) {
          this.blockAlertMarginTop = (this.$refs.infoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
  }
}
</script>

<style>
@import '/css/mydocuments.css'
</style>

