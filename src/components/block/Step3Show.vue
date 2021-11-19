<template>
  <div class="Step3Show">
    <div class="Step3Show__content">
      <div class="Step3Show__loading">
        <div class="Step3Show__loading-title">Шаг 3</div>
        <div class="Step3Show__loading-show">
          <div class="Step3Show__loading-show-filled"></div>
        </div>
        <div class="Step1Show__error" v-if="error">Error: <span>{{ error }}</span></div>
      </div>
      <div class="Step3Show__body">
        <div class="Step3Show__list-free-services">
          <ul class="Step3Show__list-services">
            <li class="Step3Show__service" v-for="(service, index) in freeServices" :key="'Q'+index">
              <img class="Step3Show__service-image" v-if="service.advantage" src="/images/block-success.svg">
              <img class="Step3Show__service-image" v-else src="/images/block-defeat.svg">
              <p :class="'Step3Show__service-description '+(service.advantage?'Step3Show__service-has':'Step3Show__service-not')">{{ service.title }}</p>
            </li>
          </ul>
          <input class="Step3Show__free" type="button" value="Бесплатно" v-on:click="lastStep('free')">
        </div>
        <div class="Step3Show__freeOrPay">или</div>
        <div class="Step3Show__list-pay-services">
          <ul class="Step3Show__list-services">
            <li class="Step3Show__service" v-for="(service, index) in payServices" :key="'R'+index">
              <img class="Step3Show__service-image" v-if="service.advantage" src="/images/block-success.svg">
              <img class="Step3Show__service-image" v-else src="/images/block-defeat.svg">
              <p :class="'Step3Show__service-description '+(service.advantage?'Step3Show__service-has':'Step3Show__service-not')">{{ service.title }}</p>
            </li>
          </ul>
          <input class="Step3Show__pay" type="button" value="20 000 тг" v-on:click="lastStep('pay')">
        </div>
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
      freeServices: [
        { title: 'Отградим от незаконных действий МФО', advantage: true },
        { title: 'Отградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Отградим от незаконных действий ЧСИ', advantage: true },
        { title: 'Отменим исполнительный лист/надпись', advantage: false },
        { title: 'Улучшаем кредитную историю', advantage: false },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: false },
        { title: 'Подготовим ИСК', advantage: false },
        { title: 'Письмо в Юстиции', advantage: false },
        { title: 'Письмо в палату ЧСИ', advantage: false },
      ],
      payServices: [
        { title: 'Отградим от незаконных действий МФО', advantage: true },
        { title: 'Отградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Отградим от незаконных действий ЧСИ', advantage: true },
        { title: 'Отменим исполнительный лист/надпись', advantage: true },
        { title: 'Улучшаем кредитную историю', advantage: true },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: true },
        { title: 'Подготовим ИСК', advantage: true },
        { title: 'Письмо в Юстиции', advantage: true },
        { title: 'Письмо в палату ЧСИ', advantage: true },
      ],
      iin: '',
      token: '',
      type: '',
      error: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token || !this.$session.get('step2success')) {
      this.$router.push({path: '/step2show'});
    }
    else if (!localStorage.getItem('logged')) {
      this.$router.push({path: '/'});
    }
    localStorage.setItem('smsCode', '');
  },
  methods: {
    async lastStep(type) {
      this.type = type;
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/lastStep', {
        'token': this.token,
        'type': this.type,
      })
          .then(async response => {
            if (response.data.success) {
              console.log(response.data);
              await this.$session.set('step2success', false);
              this.$router.push({path: '/notifications'});
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
@import url('/css/block/Step3Show.css');
@import url('/css/block/mobile/Step3Show.css');
</style>
