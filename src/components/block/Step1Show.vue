<template>
  <div>
  <div class="Step1Show">
    <div class="Step1Show__content">
      <div class="Step1Show__loading">
        <div class="Step1Show__loading-title">Шаг 1</div>
        <div class="Step1Show__loading-show">
          <div class="Step1Show__loading-show-filled"></div>
        </div>
      </div>
      <div class="Step1Show__body">
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            ФИО
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            ИИН
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Номер телефона
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Электронная почта
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Придумайте пароль
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text">
        </div>
      </div>
      <div class="Step1Show__footer">
        <input class="Step1Show__submit" type="button" value="Следующий шаг >">
      </div>
    </div>
  </div>
  <Confirm ref="confirmBlockAlerts" />
  </div>
</template>

<script>
import Confirm from './confirm';
const axios = require('axios');

export default {
  components: {
    Confirm,
  },
  data() {
    return {
      step1BlockAlertDisplay: 'none',
      step1BlockAlertMarginTop: 0,
      fio: '',
      iin: '',
      phoneNumber: '',
      email: '',
      password: '',
      token: '',
      smsCode: '',
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
              this.sendSMS();
            }
            else {
              console.log('error2');
            }
          })
          .catch(error => {
            console.log('error: '+error);
          });
    },
    errorInput() {
      setTimeout(() => {},3000);
    },
    onChangeInput() {
      console.log();
    },
    async sendSMS() {
      console.log({
        'phone': this.phoneNumber,
        'token': this.token,
      });
      await axios.post('https://crediter.kz/api/sendMessage', {
        'phone': this.phoneNumber,
        'token': this.token,
      })
          .then(response => {
            if (response.data.success) {
              this.smsCode = response.data.sms;
              console.log(response.data);
              this.obfConfirmBlockAlerts();
            }
            else {
              console.log('error2');
            }
          })
          .catch(error => {
            console.log('error: '+error);
          });
    },
    step1ClickScreen() {
      if (this.$refs.confirmBlockAlerts.step2BackStep1 === true) {
        this.$refs.confirmBlockAlerts.step1CloseStep2();
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
    obfConfirmBlockAlerts() {
      this.step1BlockAlertClose();
      this.$refs.confirmBlockAlerts.step2BackStep1 = false;
      this.$refs.confirmBlockAlerts.smsCode = this.smsCode;
      this.$refs.confirmBlockAlerts.token = this.token;
      this.$refs.confirmBlockAlerts.confirmBlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/Step1Show.css');
@import url('/css/block/mobile/Step1Show.css');
</style>
