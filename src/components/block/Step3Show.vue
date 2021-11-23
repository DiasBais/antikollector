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
        </div>
      </div>
      <div class="Step3Show__agreements-and-list-mfos">
        <div class="Step3Show__agreements">
          <div class="Step3Show__documents">
            <label class="Step3Show__agreement">
              <input class="Step3Show__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="Step3Show__agreement-view" :src="document1Image" v-on:click="onClickCheckBoxAgreement(1)">
            </label>
            <p class="Step3Show__document">
              <router-link target="_blank" to="/documents/Договор поручения.docx">Договор поручения</router-link>
            </p>
          </div>
          <div class="Step3Show__documents">
            <label class="Step3Show__agreement">
              <input class="Step3Show__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="Step3Show__agreement-view" :src="document2Image" v-on:click="onClickCheckBoxAgreement(2)">
            </label>
            <p class="Step3Show__document">
              <router-link target="_blank" to="/documents/Публичная оферта.docx">Публичная оферта</router-link>
            </p>
          </div>
          <div class="Step3Show__documents">
            <label class="Step3Show__agreement">
              <input class="Step3Show__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="Step3Show__agreement-view" :src="document3Image" v-on:click="onClickCheckBoxAgreement(3)">
            </label>
            <p class="Step3Show__document">
              <router-link target="_blank" to="/documents/Согласие на сбор и обработку персональных данных.docx">Согласие на сбор и обработку персональных данных</router-link>
            </p>
          </div>
        </div>
        <div class="Step3Show__mfos">
          <div class="Step3Show__mfos-grouping" v-for="(mfo,index) in Math.ceil(mfos.length/2)" :key="'PP'+index">
            <div class="Step3Show__mfo Step3Show__mfo-left"
                 :title="mfos[(index*2)].organization"
            >
              <p>{{ mfos[(index*2)].organization }}</p><span> - 5 000 тг</span>
            </div>
            <div class="Step3Show__mfo Step3Show__mfo-right"
                 v-if="(!(mfos.length%2) && (index === Math.ceil(mfos.length/2)-1)) || (index !== Math.ceil(mfos.length/2)-1)"
                 :title="(index===0)?(mfos[1].organization):(mfos[((index*2)+1)].organization)"
            >
              <p>{{ (index===0)?(mfos[1].organization):(mfos[((index*2)+1)].organization) }}</p><span> - 5 000 тг</span>
            </div>
          </div>
        </div>
      </div>
      <div class="Step3Show__footer">
        <input :class="'Step3Show__free '+(!((document1)&&(document2)&&(document3))?'Step3Show__submit-free-disabled':'')"
               type="button"
               value="Бесплатно"
               v-on:click="lastStep('free')"
               disabled="!(document1&&document2&&document3)"
        >
        <input :class="'Step3Show__pay '+(!((document1)&&(document2)&&(document3))?'Step3Show__submit-pay-disabled':'')"
               type="button"
               :value="priceMFOS.toString().split('').splice(0,2).join('')+' 000 тг'"
               v-on:click="lastStep('pay')"
               disabled="!(document1&&document2&&document3)"
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
      document1: false,
      document1Image: 'images/check-default.png',
      document2: false,
      document2Image: 'images/check-default.png',
      document3: false,
      document3Image: 'images/check-default.png',
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
      priceMFOS: 0,
      mfos: [],
      type: '',
      error: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.mfos = localStorage.getItem('mfos');
    this.priceMFOS = localStorage.getItem('priceMFOS');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    else if (!this.$session.get('step2success')) {
      this.$router.push({path: '/step2show'});
    }
    localStorage.setItem('mfos', '');
    localStorage.setItem('priceMFOS', '');
  },
  methods: {
    onClickCheckBoxAgreement(index) {
      if (index === 1) {
        if (this.document1) {
          this.document1 = false;
          this.document1Image = 'images/check-default.png';
        }
        else {
          this.document1 = true;
          this.document1Image = 'images/check-success.png';
        }
      }
      else if (index === 2) {
        if (this.document2) {
          this.document2 = false;
          this.document2Image = 'images/check-default.png';
        }
        else {
          this.document2 = true;
          this.document2Image = 'images/check-success.png';
        }
      }
      else {
        if (this.document3) {
          this.document3 = false;
          this.document3Image = 'images/check-default.png';
        }
        else {
          this.document3 = true;
          this.document3Image = 'images/check-success.png';
        }
      }
    },
    async lastStep(type) {
      this.error = '';
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
