<template>
  <div class="confirm">
    <div class="confirm__content">
      <div class="confirm__title">Подтвердите номер телефона</div>
      <div class="confirm__body">
        <p>Введите код из СМС</p>
        <input type="number" minlength="0" maxlength="4" required>
      </div>
      <div class="confirm__submit">
        <input type="submit">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asd: ''
    }
  },
  mounted() {
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
        this.asd = '';
      }
    },
  },
}
</script>

<style>
@import url('/css/block/confirm.css');
@import url('/css/block/mobile/confirm.css');
</style>

