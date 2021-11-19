<template>
  <div class="ConfirmShow">
    <div class="ConfirmShow__content">
      <div class="ConfirmShow__title">Подтвердите номер телефона</div>
      <div class="ConfirmShow__body">
        <p class="ConfirmShow__description">Введите код из СМС</p>
        <input class="ConfirmShow__code" type="text" v-model="smsCode" v-on:keydown="onKeyDownSMSCode($event)">
      </div>
      <div class="ConfirmShow__footer">
        <input class="ConfirmShow__submit" type="text" value="Защитить меня">
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueSession from 'vue-session';
Vue.use(VueSession);

export default {
  data() {
    return {
      smsCode: '_ _ _ _',
      smsCodeOriginal: '',
      iin: '',
      token: '',
      dataSMSCode: '',
    }
  },
  mounted() {
    this.iin = localStorage.getItem('token');
    this.token = localStorage.getItem('token');
    this.dataSMSCode = localStorage.getItem('smsCode');
    if (!this.iin || !this.token || !this.dataSMSCode) {
      this.$router.push({path: '/step1show'});
    }
    else if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
  },
  methods: {
    async nextPage() {
      if (this.validateStep2() || this.dataSMSCode === this.smsCode) return;
      await localStorage.setItem('smsCode', '');
      await this.$session.set('smsCodeConfirmation', true);
      this.$router.push({path: '/step2show'});
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
@import url('/css/block/ConfirmShow.css');
@import url('/css/block/mobile/ConfirmShow.css');
</style>
