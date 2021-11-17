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
                <p>ФИО<span title="Поле обязательно для заполнения">*</span></p>
                <input class="blockAlert-step1__error" value="" v-model="fio" required>
                <p class="blockAlert-step1__error-text">Поле обязательно для заполнения</p>
                <p class="blockAlert-step1__error-text">Введите только на киррилице</p>
                <p class="blockAlert-step1__error-text">Введите полное имя ( Например: Абаев Абылай)</p>
              </div>
              <div class="blockAlert-step1__input">
                <p>ИИН<span title="Поле обязательно для заполнения">*</span></p>
                <input value="" v-model="iin" required>
                <p class="blockAlert-step1__error-text">Поле обязательно для заполнения</p>
              </div>
              <div class="blockAlert-step1__input">
                <p>Номер телефона<span title="Поле обязательно для заполнения">*</span></p>
                <input value="" v-model="phoneNumber" required>
                <p class="blockAlert-step1__error-text">Поле обязательно для заполнения</p>
                <p class="blockAlert-step1__error-text">Неправильный телефон номер</p>
                <p class="blockAlert-step1__error-text">Нет соответствующего оператора</p>
              </div>
              <div class="blockAlert-step1__input">
                <p>Электронная почта</p>
                <input value="" v-model="email" required>
                <p class="blockAlert-step1__error-text">Неправильный email</p>
              </div>
              <div class="blockAlert-step1__input">
                <p>Придуйате пароль<span title="Поле обязательно для заполнения">*</span></p>
                <input value="" v-model="password" required>
                <p class="blockAlert-step1__error-text">Поле обязательно для заполнения</p>
                <p class="blockAlert-step1__error-text">Минимальная длина пароля должна быть больше 6 символов</p>
                <p class="blockAlert-step1__error-text">Максимальная длина пароля должна быть меньше 36 символов</p>
              </div>
            </div>
            <div class="blockAlert-step1__active">
              <input type="submit" value="Следующий шаг >" v-on:click="submitRequestFirstStep()">
            </div>
          </form>
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
@import url('/css/block/step1.css');
@import url('/css/block/mobile/step1.css');
</style>

