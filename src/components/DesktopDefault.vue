<template>
  <div class="desktop6">
  </div>
</template>

<script>
export default {
  data () {
    return {
      asd: ''
    }
  },
  created () {
    this.mobileVersion();
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        this.asd = '';
      }
    }
  },
}
</script>

<style>
.desktop {
  width: 100%;
  display: flex;
  justify-content: center;
}
.desktop__content {
  width: 1080px;
  text-align: center;
  padding: 0px 0px 0px 0px;
}
</style>
