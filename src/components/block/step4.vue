<template>
  <div class="step4">
    <div class="step4__content">
      <div class="step4__loading">
        <div class="step4__loading-title">Шаг 4</div>
        <div class="step4__loading-show">
          <div class="step4__loading-show-filled"></div>
        </div>
        <div class="step4__error" v-if="error">Error: <span>{{ error }}</span></div>
      </div>
      <div class="step4__title">Выберите способ оплаты</div>
      <div class="step4__body">
        <div class="step4__body-content">
          <div :class="'step4__payment step4__paybox '+((paymentMethod==='paybox')?'step4__payment-active':'')" v-on:click="changePaymentMethod('paybox')">
            <img class="step4__payment-image step4__paybox-image" src="/images/paybox.png">
          </div>
          <div :class="'step4__payment step4__qiwi '+((paymentMethod==='qiwi')?'step4__payment-active':'')" v-on:click="changePaymentMethod('qiwi')">
            <img class="step4__payment-image step4__qiwi-image" src="/images/qiwi.png">
          </div>
          <div :class="'step4__payment step4__kassa24 '+((paymentMethod==='kassa24')?'step4__payment-active':'')" v-on:click="changePaymentMethod('kassa24')">
            <img class="step4__payment-image step4__kassa24-image" src="/images/kassa24.png">
          </div>
        </div>
      </div>
      <div class="step4__footer">
        <input class="step4__submit"
               type="button"
               value="Оплатить"
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
    console.log(this.$session.get('step3success'));
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    else if (!this.$session.get('step3success')) {
      this.$router.push({path: '/step-3'});
    }
    localStorage.setItem('mfos', '');
    localStorage.setItem('priceMFOS', '');
  },
  methods: {
    changePaymentMethod(method) {
      this.error = '';
      this.paymentMethod = method;
    },
    async makePayment() {
      this.error = '';
      if (!this.paymentMethod) {
        this.error = 'Выберите способ оплаты';
        return;
      }
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/makePayment', {
        'amount': this.priceMFOS,
        'iin': this.iin,
      })
          .then(async response => {
            if (response.data) {
              await this.$session.set('step2success', false);
              this.payment(response.data[0], response.data[1]);
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
    async payment(firstPart, secondPart) {
      this.error = '';
      const axios = require('axios');
      await axios.post(firstPart, secondPart, { header: { 'Access-Control-Allow-Origin': '*' } })
          .then(async response => {
            if (response.data) {
              document.location.href = (response.data.split('"')[7]);
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
@import url('/css/block/step4.css');
@import url('/css/block/mobile/step4.css');
</style>
