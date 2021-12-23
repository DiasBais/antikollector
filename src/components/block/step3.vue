<template>
  <div class="step3">
    <div class="step3__content">
      <div class="step3__loading">
        <div class="step3__loading-title">Шаг 3</div>
        <div class="step3__loading-show">
          <div class="step3__loading-show-filled"></div>
        </div>
      </div>
      <div class="step3__body">
        <div class="step3__list-free-services">
          <ul class="step3__list-services">
            <li class="step3__service" v-for="(service, index) in freeServices" :key="'Q'+index">
              <img class="step3__service-image" v-if="service.advantage" src="/images/block-success.svg">
              <img class="step3__service-image" v-else src="/images/block-defeat.svg">
              <p :class="'step3__service-description '+(service.advantage?'step3__service-has':'step3__service-not')">{{ service.title }}</p>
            </li>
          </ul>
        </div>
        <div class="step3__freeOrPay">или</div>
        <div class="step3__list-pay-services">
          <ul class="step3__list-services">
            <li class="step3__service" v-for="(service, index) in payServices" :key="'R'+index">
              <img class="step3__service-image" v-if="service.advantage" src="/images/block-success.svg">
              <img class="step3__service-image" v-else src="/images/block-defeat.svg">
              <p :class="'step3__service-description '+(service.advantage?'step3__service-has':'step3__service-not')">{{ service.title }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="step3__agreements-and-list-mfos">
        <div class="step3__agreements">
          <div class="step3__documents">
            <label class="step3__agreement">
              <input class="step3__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="step3__agreement-view" :src="document1Image" v-on:click="onClickCheckBoxAgreement(1)">
            </label>
            <p class="step3__document">
              <router-link target="_blank" to="/documents/Договор поручения.docx">Договор поручения</router-link>
            </p>
          </div>
          <div class="step3__documents">
            <label class="step3__agreement">
              <input class="step3__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="step3__agreement-view" :src="document2Image" v-on:click="onClickCheckBoxAgreement(2)">
            </label>
            <p class="step3__document">
              <router-link target="_blank" to="/documents/Публичная оферта.docx">Публичная оферта</router-link>
            </p>
          </div>
          <div class="step3__documents">
            <label class="step3__agreement">
              <input class="step3__agreement-checkbox" type="checkbox" :checked="document1">
              <img class="step3__agreement-view" :src="document3Image" v-on:click="onClickCheckBoxAgreement(3)">
            </label>
            <p class="step3__document">
              <router-link target="_blank" to="/documents/Согласие на сбор и обработку персональных данных.docx">Согласие на сбор и обработку персональных данных</router-link>
            </p>
          </div>
        </div>
        <div class="step3__mfos">
          <div class="step3__mfos-grouping" v-for="(mfo,index) in Math.ceil(mfos.length/2)" :key="'PP'+index">
            <div class="step3__mfo step3__mfo-left"
                 :title="mfos[(index*2)].organization"
            >
              <p v-if="index === 0">{{ mfos[(index*2)].organization }}</p><span v-if="index === 0"> - 10 000 тг</span>
              <p v-if="index !== 0">{{ mfos[(index*2)].organization }}</p><span v-if="index !== 0"> - 5 000 тг</span>
            </div>
            <div class="step3__mfo step3__mfo-right"
                 v-if="(!(mfos.length%2) && (index === Math.ceil(mfos.length/2)-1)) || (index !== Math.ceil(mfos.length/2)-1)"
                 :title="(index===0)?(mfos[1].organization):(mfos[((index*2)+1)].organization)"
            >
              <p>{{ (index===0)?(mfos[1].organization):(mfos[((index*2)+1)].organization) }}</p><span> - 5 000 тг</span>
            </div>
          </div>
        </div>
      </div>
      <div class="step3__footer">
        <div class="step3__error" v-if="error">Error: <span>{{ error }}</span></div>
        <div class="step3__transitions">
          <input :class="'step3__free '+(!((document1)&&(document2)&&(document3))?'step3__submit-free-disabled':'')"
                 type="button"
                 value="Бесплатно"
                 v-on:click="lastStep('Бесплатно')"
                 :disabled="!(document1&&document2&&document3)"
          >
          <input :class="'step3__pay '+(!((document1)&&(document2)&&(document3))?'step3__submit-pay-disabled':'')"
                 type="button"
                 :value="priceMFOS.toString().split('').splice(0,2).join('')+' 000 тг'"
                 v-on:click="lastStep('Платно')"
                 :disabled="!(document1&&document2&&document3)"
          >
        </div>
      </div>
    </div>
    <div class="step3__back-to" v-if="hideBack4">
      <p v-on:click="closeOnBackTo4">X</p>
      <button class="step3__back-to-btn" type="button" v-on:click="onBackTo4">Вернуться к четвертому этапу</button>
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
      document1: true,
      document1Image: 'images/check-success.png',
      document2: true,
      document2Image: 'images/check-success.png',
      document3: true,
      document3Image: 'images/check-success.png',
      freeServices: [
        { title: 'Оградим от незаконных действий МФО', advantage: true },
        { title: 'Оградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Оградим от незаконных действий ЧСИ', advantage: true },
        { title: 'Отменим исполнительный лист/надпись', advantage: false },
        { title: 'Улучшаем кредитную историю', advantage: false },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: false },
        { title: 'Подготовим ИСК', advantage: false },
        { title: 'Письмо в Юстицию', advantage: false },
        { title: 'Письмо в палату ЧСИ', advantage: false },
      ],
      payServices: [
        { title: 'Оградим от незаконных действий МФО', advantage: true },
        { title: 'Оградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Оградим от незаконных действий ЧСИ', advantage: true },
        { title: 'Отменим исполнительный лист/надпись', advantage: true },
        { title: 'Улучшаем кредитную историю', advantage: true },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: true },
        { title: 'Подготовим ИСК', advantage: true },
        { title: 'Письмо в Юстицию', advantage: true },
        { title: 'Письмо в палату ЧСИ', advantage: true },
      ],
      iin: '',
      token: '',
      priceMFOS: 0,
      mfos: [],
      type: '',
      error: '',
      hideBack4: '',
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
    this.$store.commit('SET_FOOTER',false);
  },
  methods: {
    closeOnBackTo4() {
      this.hideBack4 = false;
    },
    onBackTo4() {
      this.$router.push({path: '/step-4'});
    },
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
      this.$store.commit('SET_LOADING', true);
      this.type = type;
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/lastStep', {
        'token': this.token,
        'amount': this.priceMFOS,
        'type': this.type,
      })
          .then(async response => {
            if (response.data.success) {
              this.$store.commit('SET_LOADING', false);
              localStorage.setItem('step3Passed', true);
              if (type === 'Платно') this.$router.push({path: '/step-4?utm_source=doaff&click_id=e0f51fc098220d9b7aaa0549b2022128'});
              // if (this.type === 'Платно') this.makePayment();
              else this.$router.push({path: '/notifications'});
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
    // async makePayment() {
    //   this.error = '';
    //   const axios = require('axios');
    //   await axios.post('https://crediter.kz/api/makePayment', {
    //     'amount': this.priceMFOS,
    //     'iin': this.iin,
    //   })
    //       .then(async response => {
    //         if (response.data) {
    //           this.$store.commit('SET_LOADING', false);
    //           await localStorage.setItem('paymentLink', (response.data[0]+'?'+response.data[1]));
    //           await window.open('https://www.antikollector.kz/?v=e0f51fc098220d9b7aaa0549b2022128&utm_source=doaff&utm_medium=affiliate&utm_campaign=doaff&web_id=_hICYFw--&utm_content=doaff','_blank');
              // window.open((response.data[0]+'?'+response.data[1]));
              // console.log(response.data[0]+'?'+response.data[1]);
              // document.location.href = (response.data[0]+'?'+response.data[1]);
              // this.makeTracker(response.data[0],response.data[1]);
          //   }
          //   else {
          //     this.$store.commit('SET_LOADING', false);
          //     this.error = response.data.message;
          //   }
          // })
          // .catch(error => {
          //   this.$store.commit('SET_LOADING', false);
          //   this.error = error;
          // });
    // },
  }
}
</script>

<style>
@import url('/css/block/step3.css');
@import url('/css/block/mobile/step3.css');
</style>
