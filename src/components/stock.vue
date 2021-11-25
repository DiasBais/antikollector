<template>
  <div class="stock" :style="'height: '+heightStock+'px'">
    <div class="stock__content">
      <div class="stock__inside">
        <div class="stock__title">АКЦИЯ</div>
        <div class="stock__description">-50% скидка на все  последующие услуги</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heightStock: 0
    }
  },
  created () {
    this.stockMobileVersion();
    window.addEventListener('resize', this.stockMobileVersion());
  },
  methods: {
    stockMobileVersion() {
      if (window.innerWidth < 1160) this.heightStock = (0.528 * window.innerWidth * 0) + 198;
      else this.heightStock = (0.30347 * window.innerWidth * 0) + 437;
    }
  },
}
</script>

<style>
@import url('/css/stock.css');
@import url('/css/mobile/stock.css');
</style>
