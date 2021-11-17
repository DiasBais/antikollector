<template>
  <div>
  <div class="confirm" :style="'display: '+confirmBlockAlertDisplay">
    <div class="confirm__bodys">
      <div class="confirm__background" v-on:click="confirmBlockAlertClose"></div>
      <div class="confirm__content">
        <div class="confirm__title">Подтвердите номер телефона</div>
        <div class="confirm__body">
          <p>Введите код из СМС</p>
          <input type="number" minlength="0" maxlength="4" v-model="mySmsCode" required>
        </div>
        <div class="confirm__submit">
          <input type="button" v-on:click="obfStep2BlockAlerts" value="Защитить меня">
        </div>
      </div>
    </div>
  </div>
  <Step2 ref="step2BlockAlerts" />
  </div>
</template>

<script>
import Step2 from './step2';

export default {
  components: {
    Step2,
  },
  data() {
    return {
      confirmBlockAlertDisplay: 'none',
      token: '',
      step2BackStep1: false,
      mySmsCode: '',
      smsCode: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.mobileVersion();
    })
    window.addEventListener('click', this.confirmClickScreen);
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    async submitRequestFirstStep() {
      console.log(this.mySmsCode, this.smsCode);
      if (this.mySmsCode === this.smsCode) {
        this.obfStep2BlockAlerts();
      }
    },
    confirmBlockAlertOpen() {
      this.confirmBlockAlertDisplay = 'block';
    },
    confirmBlockAlertClose() {
      this.confirmBlockAlertDisplay = 'none';
    },
    confirmClickScreen() {
      if (this.$refs.step2BlockAlerts.step2BackStep1 === true) {
        this.step1CloseStep2();
        this.step2BackStep1 = true;
        console.log('confirmStep2ToStep1');
      }
    },
    step1CloseStep2() {
      this.$refs.step2BlockAlerts.step2BlockAlertClose();
    },
    step2BlockAlertOpen() {
      this.$refs.step2BlockAlerts.step2BlockAlertOpen();
    },
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        this.asd = '';
      }
    },
    obfStep2BlockAlerts() {
      this.confirmBlockAlertClose();
      this.$refs.step2BlockAlerts.step2BackStep1 = false;
      this.$refs.step2BlockAlerts.token = this.token;
      this.$refs.step2BlockAlerts.step2BlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/confirm.css');
@import url('/css/block/mobile/confirm.css');
</style>

