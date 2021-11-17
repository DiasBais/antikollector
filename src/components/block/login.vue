<template>
  <div>
  <div class="blockAlert-login" :style="'display: '+LoginBlockAlertDisplay">
    <div class="blockAlert-login__pos">
      <div class="blockAlert-login__background" v-on:click="LoginBlockAlertClose"></div>
      <div class="blockAlert-login__content" ref="LoginInfoBlockAlert" :style="'margin: '+LoginBlockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-login__title">Войти в личный кабинет</div>
        <form action="#">
          <div class="blockAlert-login__body">
            <div class="blockAlert-login__input">
              <p>ИИН<span>*</span></p>
              <input name="iin" value="" v-model="iin">
            </div>
            <div class="blockAlert-login__input">
              <p>Введите пароль<span>*</span></p>
              <input name="password" type="password" value="" v-model="password">
            </div>
            <div class="blockAlert-login__links">
              <p>Нет аккаунта? <span @click="obfStep1BlockAlerts">Зарегестрируйтесь</span></p>
              <p>Забыли пароль?</p>
            </div>
          </div>
          <div class="blockAlert-login__active">
            <input type="button" value="Войти" @click="submitRequestLogin">
          </div>
        </form>
      </div>
    </div>
  </div>
    <Step1 ref="step1BlockAlerts" />
  </div>
</template>

<script>
import Step1 from './step1';
// import axios from "../../core/axios";

export default {
  components: {
    Step1,
  },
  data() {
    return {
      LoginBlockAlertDisplay: 'none',
      LoginBlockAlertMarginTop: 0,
      iin: '',
      password: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.loginMobileVersion();
    })
    window.addEventListener('resize', this.loginMobileVersion);
  },
  methods: {
    submitRequestLogin() {
      /*
      let formData = new FormData();
      formData.append('iin', this.iin);
      formData.append('password', this.password);
      axios().post('signIn', formData, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      */
      const axios = require('axios');
      axios.post('https://crediter.kz/api/signIn', { 'iin': this.iin, 'password': this.password })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    },
    loginMobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.$refs.LoginInfoBlockAlert.clientHeight >= window.innerHeight) {
          this.LoginBlockAlertMarginTop = (this.$refs.LoginInfoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    LoginBlockAlertOpen() {
      this.LoginBlockAlertDisplay = 'block';
    },
    LoginBlockAlertClose() {
      this.LoginBlockAlertDisplay = 'none';
    },
    obfStep1BlockAlerts() {
      this.LoginBlockAlertClose();
      this.$refs.step1BlockAlerts.step1BlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/login.css');
@import url('/css/block/mobile/login.css');
</style>

