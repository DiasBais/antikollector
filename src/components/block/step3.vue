<template>
  <div>
  <div class="blockAlert-step3" :style="'display: '+step3BlockAlertDisplay">
    <div class="blockAlert-step3__pos">
      <div class="blockAlert-step3__background" v-on:click="step3BlockAlertClose"></div>
      <div class="blockAlert-step3__content" ref="infoStep3BlockAlert" :style="'margin: '+step3BlockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step3__loading">
          <div class="blockAlert-step3__loading-title">Шаг 3</div>
          <div class="blockAlert-step3__loading-view">
            <div class="blockAlert-step3__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step3__body">
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input type="file" v-bind:model="pathFile">
            </div>
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input type="file" v-bind:model="pathFile">
            </div>
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input type="file" v-bind:model="pathFile">
            </div>
          </div>
          <div class="blockAlert-step3__active">
            <input class="blockAlert-step3__active-back" type="button" value="Назад" v-on:click="obfStep2BlockAlertsBack">
            <input class="blockAlert-step3__active-go" type="button" value="Бесплатная услуга" v-on:click="obfStep4BlockAlerts">
          </div>
        </form>
      </div>
    </div>
  </div>
  <Step4 ref="step4BlockAlerts" />
  </div>
</template>

<script>
import Step4 from './step4';

export default {
  components: {
    Step4,
  },
  data() {
    return {
      step3BlockAlertDisplay: 'none',
      step3BlockAlertMarginTop: 0,
      pathFile: '',
      step3BackStep2: false,
      token: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.step3MobileVersion();
    })
    window.addEventListener('resize', this.step3MobileVersion);
  },
  methods: {
    step3MobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.step3BlockAlertDisplay === 'block' && this.$refs.infoStep3BlockAlert.clientHeight >= window.innerHeight) {
          this.step3BlockAlertMarginTop = (this.$refs.infoStep3BlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    step3BlockAlertOpen() {
      this.step3BlockAlertDisplay = 'block';
    },
    step3BlockAlertClose() {
      this.step3BlockAlertDisplay = 'none';
    },
    obfStep2BlockAlertsBack() {
      this.step3BackStep2 = true;
    },
    obfStep4BlockAlerts() {
      this.step3BlockAlertClose();
      this.$refs.step4BlockAlerts.token = this.token;
      this.$refs.step4BlockAlerts.step4BlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/step3.css');
@import url('/css/block/mobile/step3.css');
</style>

