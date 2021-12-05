<template>
  <div class="step5">
    <div class="step5__content">
      <div class="step5__loading">
        <div class="step5__loading-title">Шаг 5</div>
        <div class="step5__error" v-if="error">Error: <span>{{ error }}</span></div>
      </div>
      <div class="step5__title">Мы в ожидании</div>
      <div class="step5__body">
        <span>
          Инструкция
        </span>
      </div>
      <div class="step5__footer">
        <input class="step5__submit"
               type="button"
               value="Оплата с помощью карты"
               v-on:click="makePayment()"
        >
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
      qiwi: false,
      kassa24: false,
      iin: '',
      token: '',
      priceMFOS: 0,
      paymentMethod: '',
      mfos: [],
      error: '',
    }
  },
  mounted() {
    this.iin = localStorage.getItem('iin');
    this.token = localStorage.getItem('token');
    this.mfos = JSON.parse(localStorage.getItem('mfos'));
    this.priceMFOS = localStorage.getItem('priceMFOS');
    console.log(this.$session.get('step4success'));
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    else if (!this.$session.get('step4success')) {
      this.$router.push({path: '/step-4'});
    }
  },
  methods: {
    changePaymentMethod(method) {
      this.error = '';
      this.paymentMethod = method;
    },
    onClickPaymentMethod() {
      if (this.paymentMethod === 'paybox') this.makePayment();
      else this.$router.push({path: '/step-5'});
    },
    async makeQiwi() {
      this.qiwi = true;
      this.kassa24 = false;
    },
    async makeKassa24() {
      this.kassa24 = true;
      this.qiwi = false;
    },
    async makePayment() {
      this.error = '';
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/makePayment', {
        'amount': this.priceMFOS,
        'iin': this.iin,
      })
          .then(async response => {
            if (response.data) {
              await this.$session.set('step4success', false);
              document.location.href = (response.data[0]+'?'+response.data[1]);
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
  }
}
</script>

<style>
@import url('/css/block/step5.css');
@import url('/css/block/mobile/step5.css');
</style>
