<template>
  <div class="desktop5" :style="'height: '+heightDesktop5+'px'">
    <div class="desktop5__content">
      <div class="desktop5__inside">
        <div class="desktop5__title">АКЦИЯ</div>
        <div class="desktop5__description">-50% скидка на все  последующие услуги</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heightDesktop5: 0
    }
  },
  created () {
    this.desktop5MobileVersion();
    window.addEventListener('resize', this.desktop5MobileVersion());
  },
  methods: {
    desktop5MobileVersion() {
      if (window.innerWidth < 1160) {
        this.heightDesktop5 = (0.528 * window.innerWidth * 0) + 198;
      }
      else {
        this.heightDesktop5 = (0.30347 * window.innerWidth * 0) + 437;
      }
    }
  },
}
</script>

<style>
@import url('/css/desktop5.css');
@import url('/css/mobile/desktop5.css');
</style>
