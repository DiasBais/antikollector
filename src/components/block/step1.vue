<template>
  <div class="blockAlert-step1" :style="'display: '+blockAlertDisplay">
    <div class="blockAlert-step1__pos">
      <div class="blockAlert-step1__background" v-on:click="blockAlertClose"></div>
      <div class="blockAlert-step1__content" ref="infoBlockAlert" :style="'margin: '+blockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step1__loading">
          <div class="blockAlert-step1__loading-title">Шаг 1</div>
          <div class="blockAlert-step1__loading-view">
            <div class="blockAlert-step1__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step1__body">
            <div class="blockAlert-step1__input">
              <p>ФИО<span>*</span></p>
              <input value="">
            </div>
            <div class="blockAlert-step1__input">
              <p>ИИН<span>*</span></p>
              <input value="">
            </div>
            <div class="blockAlert-step1__input">
              <p>Номер телефона<span>*</span></p>
              <input value="">
            </div>
            <div class="blockAlert-step1__input">
              <p>Электронная почта</p>
              <input value="">
            </div>
            <div class="blockAlert-step1__input">
              <p>Придуйате пароль<span>*</span></p>
              <input value="">
            </div>
          </div>
          <div class="blockAlert-step1__active">
            <input type="submit" value="Следующий шаг >">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockAlertDisplay: 'block',
      blockAlertMarginTop: 0,
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
        if (this.$refs.infoBlockAlert.clientHeight >= window.innerHeight) {
          this.blockAlertMarginTop = (this.$refs.infoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    blockAlertOpen() {
      this.blockAlertDisplay = 'block';
    },
    blockAlertClose() {
      this.blockAlertDisplay = 'none';
    },
  },
}
</script>

<style>
@import url('/css/block/step1.css');
@import url('/css/block/mobile/step1.css');
</style>

