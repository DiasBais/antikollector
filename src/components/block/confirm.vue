<template>
  <div class="confirm">
    <div class="confirm__content">
      <div class="confirm__title">Подтвердите номер телефона</div>
      <div class="confirm__body">
        <div class="confirm__error" v-if="error">Error: <span>{{ error }}</span></div>
        <p class="confirm__description">Введите код из СМС</p>
        <input class="confirm__code" type="text" v-model="smsCode" v-on:keydown="onKeyDownSMSCode($event)">
      </div>
      <div class="confirm__footer">
        <input class="confirm__submit" type="button" value="Защитить меня" v-on:click="checkCode">
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      smsCode: '_ _ _ _',
      smsCodeOriginal: '',
      fio: '',
      iin: '',
      email: '',
      password: '',
      phoneNumber: '',
      token: '',
      error: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
    this.fio = this.$session.get('fio');
    this.iin = this.$session.get('iin');
    this.email = this.$session.get('email');
    this.password = this.$session.get('password');
    this.phoneNumber = this.$session.get('phoneNumber');
    this.$session.set('fio', '');
    this.$session.set('iin', '');
    this.$session.set('email', '');
    this.$session.set('password', '');
    this.$session.set('phoneNumber', '');
  },
  methods: {
    async checkCode() {
      this.error = '';
      if (this.validateSMSCode()) return;
      await axios.get('https://crediter.kz/api/checkCode?fio='+this.fio+'&iin='+this.iin+'&phone=7'+this.phoneNumber+'&code='+this.smsCodeOriginal+'&email='+this.email+'&password='+this.password)
          .then(async response => {
            if (response.data.success) {
              this.token = response.data.token;
              await localStorage.setItem('token', this.token);
              await localStorage.setItem('logged', 'true');
              this.$forceUpdate();
              this.$router.push({path: '/step-2'});
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
    validateSMSCode() {
      if (!this.smsCodeOriginal) {
        this.error = 'Поле обязательно для заполнения';
      }
      else if (this.smsCodeOriginal.length < 4) {
        this.error = 'СМС код минимум 4 символа';
      }
      else return false;
      return true;
    },
    onKeyDownSMSCode(e) {
      if (this.smsCodeOriginal.length > 3 && e.key !== 'Backspace') {e.preventDefault();return;}
      if (e.key >= '0' && e.key <= '9') {
        this.smsCodeOriginal += e.key;
      }
      else if (e.key === 'Backspace') {
        this.smsCodeOriginal = this.smsCodeOriginal.slice(0,-1);
      }
      e.preventDefault();
      let txtSMSCode = '';
      for (let i = 0; i < 4; i++) {
        if (this.smsCodeOriginal[i] !== undefined) {
          txtSMSCode += this.smsCodeOriginal[i];
        }
        else {
          if (i===0) txtSMSCode = '';
          else txtSMSCode += ' _';
        }
      }
      this.smsCode = txtSMSCode;
    }
  }
}
</script>

<style>
@import url('/css/block/confirm.css');
@import url('/css/block/mobile/confirm.css');
</style>
