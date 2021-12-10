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
        <div class="step4__visa" v-on:click="changePaymentMethod('paybox')">
          <img class="step4__visa-image" src="/images/visa.png">
        </div>
<!--        <div class="step4__terminal" v-on:click="changePaymentMethod('terminal')">-->
<!--          <img class="step4__terminal-image" src="/images/terminal.png">-->
<!--        </div>-->
      </div>
      <div class="step4__footer">
        <input class="step4__submit"
               type="button"
               :value="namePrice"
               v-on:click="onClickPaymentMethod()"
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
      namePrice: 'Оплатить',
      mfos: [],
      error: '',
    }
  },
  mounted() {
    this.iin = localStorage.getItem('iin');
    this.token = localStorage.getItem('token');
    this.mfos = JSON.parse(localStorage.getItem('mfos'));
    this.priceMFOS = localStorage.getItem('priceMFOS');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      this.$store.commit('SET_LOGGED','');
      this.$router.push({path: '/'});
    }
    else if (!localStorage.getItem('step3Passed')) {
      this.$router.push({path: '/step-3'});
    }
  },
  methods: {
    changePaymentMethod(method) {
      this.error = '';
      this.paymentMethod = method;
      if (this.paymentMethod === 'paybox') this.namePrice = 'Оплата с помощью карты';
      else if (this.paymentMethod === 'terminal') {
        this.namePrice = 'Оплата через терминал';
      }
      else this.namePrice = '';
    },
    onClickPaymentMethod() {
      this.error = '';
      if (this.paymentMethod === 'paybox') this.makePayment();
      else if (this.paymentMethod === 'terminal') {
        this.$router.push({path: '/step-5'});
      }
      else this.error = 'Выберите способ оплаты';
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
      if (!this.paymentMethod) {
        this.error = 'Выберите способ оплаты';
        return;
      }
      this.$store.commit('SET_LOADING', true);
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/makePayment', {
        'amount': this.priceMFOS,
        'iin': this.iin,
      })
          .then(async response => {
            if (response.data) {
              await localStorage.setItem('step2Passed', '');
              await localStorage.setItem('step3Passed', '');
              await window.open('https://www.antikollector.kz/?v=e0f51fc098220d9b7aaa0549b2022128&utm_source=doaff&utm_medium=affiliate&utm_campaign=doaff&web_id=_hICYFw--&utm_content=doaff','_blank');
              window.open((response.data[0]+'?'+response.data[1]));
              // this.makeTracker(response.data[0],response.data[1]);
            }
            else {
              this.$store.commit('SET_LOADING', false);
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.$store.commit('SET_LOADING', false);
            this.error = error;
          });
    },
    // async makeTracker(url1,url2) {
    //   const axios = require('axios');
    //   await axios.post('https://www.antikollector.kz/', {
    //     'v': 'e0f51fc098220d9b7aaa0549b2022128',
    //     'utm_source': 'doaff',
    //     'utm_medium': 'affiliate',
    //     'utm_campaign': 'doaff',
    //     'web_id': '_hICYFw--',
    //     'utm_content': 'doaff',
    //   },)
    //       .then(async response => {
    //         if (response.data) {
    //           this.$store.commit('SET_LOADING', false);
    //           localStorage.setItem('step2Passed', '');
    //           localStorage.setItem('step3Passed', '');
    //           localStorage.setItem('step4Passed', 'true');
    //           document.location.href = (url1+'?'+url2);
    //         }
    //         else {
    //           this.$store.commit('SET_LOADING', false);
    //           this.error = response.data.message;
    //         }
    //       })
    //       .catch(error => {
    //         this.$store.commit('SET_LOADING', false);
    //         this.error = error;
    //       });
    // },
  }
}
</script>

<style>
@import url('/css/block/step4.css');
@import url('/css/block/mobile/step4.css');
</style>
