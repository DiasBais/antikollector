<template>
  <div class="blockAlert-step4" :style="'display: '+step4BlockAlertDisplay">
    <div class="blockAlert-step4__pos">
      <div class="blockAlert-step4__background" v-on:click="step4BlockAlertClose"></div>
      <div class="blockAlert-step4__content" ref="infoStep4BlockAlert" :style="'margin: '+step4BlockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step4__loading">
          <div class="blockAlert-step4__loading-title">Шаг 4</div>
          <div class="blockAlert-step4__loading-view">
            <div class="blockAlert-step4__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step4__services">
            <div class="blockAlert-step4__free">
              <ul>
                <li v-for="(service,index) in freeServices"
                    :class="'blockAlert-step4__service '+(service.advantage?'blockAlert-step4__service-advantage':'blockAlert-step4__service-flaw')"
                    :key="'M'+index"
                >
                  <img v-if="service.advantage" src="/images/block-success.svg">
                  <img v-if="!service.advantage" src="/images/block-defeat.svg">
                  <p>{{ service.title }}</p>
                </li>
              </ul>
            </div>
            <div class="blockAlert-step4__pay">
              <ul>
                <li v-for="(service,index) in payServices"
                    :class="'blockAlert-step4__service '+(service.advantage?'blockAlert-step4__service-advantage':'blockAlert-step4__service-flaw')"
                    :key="'M'+index"
                >
                  <img v-if="service.advantage" src="/images/block-success.svg">
                  <img v-if="!service.advantage" src="/images/block-defeat.svg">
                  <p>{{ service.title }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="blockAlert-step4__active">
            <input class="blockAlert-step4__active-free" type="button" value="Бесплатно" v-on:click="submitRequestLastStepFree">
            <input class="blockAlert-step4__active-pay" type="button" value="20 000 тг" v-on:click="submitRequestLastStepPay">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
      step4BlockAlertDisplay: 'none',
      step4BlockAlertMarginTop: 0,
      pathFile: '',
      step4BackStep3: false,
      typePay: '',
      token: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.step4MobileVersion();
    })
    window.addEventListener('resize', this.step4MobileVersion);
  },
  methods: {
    submitRequestLastStepFree() {
      this.typePay = 'бесплатно';
      this.axiosRequest();
    },
    submitRequestLastStepPay() {
      this.typePay = 'платно';
      this.axiosRequest();
    },
    async axiosRequest() {
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/lastStep', {
        'token': this.token,
        'type': this.typePay,
      })
          .then(response => {
            if (response.data.success) {
              console.log(response.data);
            }
            else {
              console.log(response.data.error);
            }
          })
          .catch(error => {
            console.log('error: '+error);
          });
    },
    step4MobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.step4BlockAlertDisplay === 'block' && this.$refs.infoStep4BlockAlert.clientHeight >= window.innerHeight) {
          this.step4BlockAlertMarginTop = (this.$refs.infoStep4BlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    step4BlockAlertOpen() {
      this.step4BlockAlertDisplay = 'block';
    },
    step4BlockAlertClose() {
      this.step4BlockAlertDisplay = 'none';
    },
    obfStep3BlockAlertsBack() {
      this.step4BackStep3 = true;
    },
  },
}
</script>

<style>
@import url('/css/block/step4.css');
@import url('/css/block/mobile/step4.css');
</style>

