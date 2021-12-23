<template>
  <div class="confirm">
    <div class="confirm__content">
      <div class="confirm__title">Подтвердите номер телефона</div>
      <div class="confirm__body">
        <div class="confirm__error" v-if="error">Error: <span>{{ error }}</span></div>
        <p class="confirm__description">Введите код из СМС</p>
        <input class="confirm__code" type="text" v-model="smsCode">
      </div>
      <div class="confirm__footer">
        <input class="confirm__submit" type="button" value="Защитить меня" v-on:click="checkCode">
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

const axios = require('axios');

export default {
  data() {
    return {
      smsCode: '',
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
    this.$store.commit('SET_FOOTER',false);
    this.confirmMobileVersion();
  },
  computed: {
    ...mapGetters({
      storageLogged: 'getLogged',
    })
  },
  watch: {
    storageLogged: function () {
      this.logged = this.storageLogged;
    },
  },
  methods: {
    async checkCode() {
      this.error = '';
      if (this.validateSMSCode()) return;
      this.$store.commit('SET_LOADING', true);
      await axios.get('https://crediter.kz/api/checkCode?fio='+this.fio+'&iin='+this.iin+'&phone='+(this.phoneNumber.slice(1,this.phoneNumber.length))+'&code='+this.smsCode+'&email='+this.email+'&password='+this.password)
          .then(async response => {
            if (response.data.success) {
              console.log(response.data);
              this.$session.set('fio', '');
              this.$session.set('iin', '');
              this.$session.set('email', '');
              this.$session.set('password', '');
              this.$session.set('phoneNumber', '');
              this.token = response.data.token;
              await localStorage.setItem('iin', this.iin);
              await localStorage.setItem('token', this.token);
              this.$store.commit('SET_LOGGED','true');
              this.$store.commit('SET_LOADING', false);
              this.$forceUpdate();
              this.$router.push({path: '/step-2'});
            }
            else {
              console.log(response.data);
              this.$store.commit('SET_LOADING', false);
              this.error = response.data.message;
            }
          })
          .catch(error => {
            console.log(error);
            this.$store.commit('SET_LOADING', false);
            this.error = error;
          });
    },
    validateSMSCode() {
      if (!this.mobileVersion) {
        if (!this.smsCode) {
          this.error = 'Поле обязательно для заполнения';
        }
        else if (this.smsCode.length !== 4) {
          this.error = 'СМС код минимум 4 символа';
        }
        else return false;
        return true;
      }
      else if (this.mobileVersion) return false;
    },
  }
}
</script>

<style>
@import url('/css/block/confirm.css');
@import url('/css/block/mobile/confirm.css');
</style>
