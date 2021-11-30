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
          <div :class="'step4__payment step4__qiwi '+((paymentMethod==='qiwi')?'step4__payment-active':'')" v-on:click="makeQiwi()">
            <img class="step4__payment-image step4__qiwi-image" src="/images/qiwi.png">
          </div>
          <div :class="'step4__payment step4__kassa24 '+((paymentMethod==='kassa24')?'step4__payment-active':'')" v-on:click="makeKassa24()">
            <img class="step4__payment-image step4__kassa24-image" src="/images/kassa24.png">
          </div>
        </div>
        <div class="step4__description">После нажатия кнопки оплатить вы будете перенаправлены на страницу оплаты</div>
        <div class="step4__descriptionPayment">
          <div class="step4__descriptionPayment-title">ИНСТРУКЦИЯ</div>
          <div class="step4__payment-content step4__qiwi" v-if="qiwi">
            <div class="step4__payment-content-title step4__qiwi-title">Qiwi терминал</div>
            <div class="step4__payment-content-body step4__qiwi-body">
              <p>1. В сенсорной панели Qiwi терминала нажать на «Оплату услуг».</p>
              <img src="/images/qiwi/step-1.png">
              <p>2. Нажать на категорию Погашение кредитов/фин. услуги</p>
              <img src="/images/qiwi/step-2.png">
              <p>3. В открывшемся меню нажать на подкатегорию МКО и МФО</p>
              <img src="/images/qiwi/step-3.png">
              <p>4. С помощью кнопки Вперед найти микрофинансовую организацию «I-credit».</p>
              <img src="/images/qiwi/step-4.png">
              <p>5. На 3 странице кликнуть логотип МКО «I-credit».</p>
              <img src="/images/qiwi/step-5.png">
              <p>6. Ввести свой ИИН и нажать на кнопку Вперед</p>
              <img src="/images/qiwi/step-6.png">
              <p>7. Перепроверить верно ли введен ИИН заемщика, для подтверждения данных нажать на кнопку Вперед.</p>
              <img src="/images/qiwi/step-7.png">
              <p>8. Внесите сумму в купюроприемник терминала «Qiwi» и нажать на кнопку Оплатить.</p>
              <img src="/images/qiwi/step-8.png">
            </div>
          </div>
          <div class="step4__payment-content step4__kassa24" v-if="kassa24">
            <div class="step4__payment-content-title step4__kassa24-title">Терминал Касса24</div>
            <div class="step4__payment-content-body step4__kassa24-body">
              <p>1. В сенсорной панели Касса24 нажать на «Оплату услуг».</p>
              <img src="/images/kassa24/step-1.png">
              <p>2. Нажать на категорию Финансовые организации:</p>
              <img src="/images/kassa24/step-2.png">
              <p>3. Найдите в списке микрофинансовую организацию «I-credit». Для этого воспользуйтесь инструментом скролла экрана справа.</p>
              <img src="/images/kassa24/step-3.png">
              <p>4. Кликните на логотип МКО «I-credit»</p>
              <img src="/images/kassa24/step-4.png">
              <p>5. Введите ИИН заемщика и кнопку Продолжить</p>
              <img src="/images/kassa24/step-5.png">
              <p>6. Внесите сумму в купюроприемник терминала «Касса24» и нажмите кнопку Оплатить.</p>
              <img src="/images/kassa24/step-6.png">
            </div>
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
    console.log(this.$session.get('step3success'));
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    else if (!this.$session.get('step3success')) {
      this.$router.push({path: '/step-3'});
    }
  },
  methods: {
    changePaymentMethod(method) {
      this.error = '';
      this.paymentMethod = method;
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
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/makePayment', {
        'amount': this.priceMFOS,
        'iin': this.iin,
      })
          .then(async response => {
            if (response.data) {
              await this.$session.set('step2success', false);
              console.log(response.data);
              console.log(response.data[1]);
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
@import url('/css/block/step4.css');
@import url('/css/block/mobile/step4.css');
</style>
