<template>
  <div>
    <div class="blockAlert-step1" :style="'display: '+step1BlockAlertDisplay">
      <div class="blockAlert-step1__pos">
        <div class="blockAlert-step1__background" v-on:click="step1BlockAlertClose"></div>
        <div class="blockAlert-step1__content" ref="infoStep1BlockAlert" :style="'margin: '+step1BlockAlertMarginTop+'px 0px 0px 0px'">
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
                <input value="" v-model="fio">
              </div>
              <div class="blockAlert-step1__input">
                <p>ИИН<span>*</span></p>
                <input value="" v-model="iin">
              </div>
              <div class="blockAlert-step1__input">
                <p>Номер телефона<span>*</span></p>
                <input value="" v-model="phoneNumber">
              </div>
              <div class="blockAlert-step1__input">
                <p>Электронная почта</p>
                <input value="" v-model="email">
              </div>
              <div class="blockAlert-step1__input">
                <p>Придуйате пароль<span>*</span></p>
                <input value="" v-model="password">
              </div>
            </div>
            <div class="blockAlert-step1__active">
              <input type="button" value="Следующий шаг >" v-on:click="submitRequestFirstStep">
            </div>
          </form>
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
      step1BlockAlertDisplay: 'block',
      step1BlockAlertMarginTop: 0,
      fio: '',
      iin: '',
      phoneNumber: '',
      email: '',
      password: '',
      token: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.step1MobileVersion();
    })
    window.addEventListener('click', this.step1ClickScreen);
    window.addEventListener('resize', this.step1MobileVersion);
  },
  methods: {
    async submitRequestFirstStep() {
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/firstStep', {
        'fio': this.fio,
        'iin': this.iin,
        'phone': this.phoneNumber,
        'email': this.email,
        'password': this.password,
      })
          .then(response => {
            if (response.data.success) {
              this.token = response.data.token;
              console.log(response.data);
              this.obfStep2BlockAlerts();
            }
            else {
              console.log(response.data.error);
            }
          })
          .catch(error => {
            console.log('error: '+error);
          });
    },
    step1ClickScreen() {
      if (this.$refs.step2BlockAlerts.step2BackStep1 === true) {
        this.$refs.step2BlockAlerts.step2BlockAlertClose();
        this.step1BlockAlertOpen();
      }
    },
    step1MobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.step1BlockAlertDisplay === 'block' && this.$refs.infoStep1BlockAlert.clientHeight >= window.innerHeight) {
          this.step1BlockAlertMarginTop = (this.$refs.infoStep1BlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    step1BlockAlertOpen() {
      this.step1BlockAlertDisplay = 'block';
    },
    step1BlockAlertClose() {
      this.step1BlockAlertDisplay = 'none';
    },
    obfStep2BlockAlerts() {
      this.step1BlockAlertClose();
      this.$refs.step2BlockAlerts.step2BackStep1 = false;
      this.$refs.step2BlockAlerts.token = this.token;
      this.$refs.step2BlockAlerts.step2BlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/step1.css');
@import url('/css/block/mobile/step1.css');
</style>

