<template>
  <div>
  <div class="blockAlert-step2" :style="'display: '+step2BlockAlertDisplay" v-on:click="onClickOrganizationsList($event)">
    <div class="blockAlert-step2__pos">
      <div class="blockAlert-step2__background" v-on:click="step2BlockAlertClose"></div>
      <div class="blockAlert-step2__content" ref="infoStep2BlockAlert" :style="'margin: '+step2BlockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step2__loading">
          <div class="blockAlert-step2__loading-title">Шаг 2</div>
          <div class="blockAlert-step2__loading-view">
            <div class="blockAlert-step2__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step2__body">
            <div class="blockAlert-step2__organizations">
              <p>Кому должен</p>
              <div style="position: relative">
                <input type="text"
                       v-model="organization"
                       :style="(hideOrganization==='none'?'border-radius: 10px':'')"
                       v-on:click="onClickOrganizationsList"
                       v-on:keyup="enterOrganizationInput"
                       class="blockAlert-step2__organizations-input"
                >
                <div class="blockAlert-step2__organizationsList"
                     :style="'display: '+hideOrganization"
                >
                  <span class="blockAlert-step2__organizationsList-option"
                     v-for="(organization,index) in organizations"
                     :key="'O'+index"
                     v-html="organization.title"
                     :style="'display: '+organization.hide"
                     v-on:click="onClickOrganizationsListOption(index)"
                  ></span>
                </div>
              </div>
            </div>
            <div class="blockAlert-step2__input-amount">
              <p>Сколько должен</p>
              <div class="blockAlert-step2__input-amount-option">
                <input type="text" v-model="amountOption">
                <span>тенге</span>
              </div>
            </div>
            <div class="blockAlert-step2__input-date">
              <p>Когда брал кредит</p>
              <input type="date" v-model="date">
            </div>
            <div class="blockAlert-step2__input-other">
              <p>Какая проблема</p>
              <input type="text" v-model="whatAProblem">
              <a href="#">+ Добавить МФО</a>
            </div>
          </div>
          <div class="blockAlert-step2__active">
            <input class="blockAlert-step2__active-back" type="submit" value="Назад" v-on:click="obfStep1BlockAlertsBack">
            <input class="blockAlert-step2__active-go" type="submit" value="Защитить меня" v-on:click="submitRequestSecondStep">
          </div>
        </form>
      </div>
    </div>
  </div>
  <Step3 ref="step3BlockAlerts" />
  </div>
</template>

<script>
import Step3 from './step3';

export default {
  components: {
    Step3,
  },
  data() {
    return {
      organization: '',
      organizations: [
        { title: 'ТОО "МФО «ФинтехФинанс"', hide: 'block' },
        { title: 'ТОО "МФО СиСиЛоун.кз"', hide: 'block' },
        { title: 'ТОО "МФО Робокэш.кз"', hide: 'block' },
        { title: 'ТОО "МФО Онлайн КазФинанс"', hide: 'block' },
        { title: 'ТОО "МФО Akshabar"', hide: 'block' },
        { title: '"ТОО ""МФО Kredit Seven Kazakhstan"', hide: 'block' },
        { title: 'ТОО МФО "Credit365 Kazakhstan"', hide: 'block' },
        { title: 'ТОО МФО аФинанс', hide: 'block' },
        { title: 'ТОО «МФО «Quick Money»', hide: 'block' },
        { title: 'ТОО МФО Kaz Credit Line', hide: 'block' },
        { title: '"ТОО МФО я ""Lending and Financy technologies"', hide: 'block' },
        { title: 'ТОО  «Unionpart» ', hide: 'block' },
        { title: 'ТОО МФО «Creditum»', hide: 'block' },
        { title: 'ТОО МФО  «SOFI FINANCE»', hide: 'block' },
        { title: 'ТОО МФО «Квику»', hide: 'block' },
        { title: 'ТОО МФО', hide: 'block' },
        { title: 'ТОО «GOFINGO»', hide: 'block' },
        { title: 'ТОО «КРЕДИТ 24»', hide: 'block' },
        { title: 'ТОО «МФО «ЮНИКРЕДО»', hide: 'block' },
        { title: 'ТОО «ALTENGE»', hide: 'block' },
        { title: 'ТОО МФО «1Кредит»', hide: 'block' },
        { title: 'ТОО МФО «Деньги говорят»', hide: 'block' },
        { title: 'ТОО МФО «Смарт Финанс»', hide: 'block' },
        { title: 'ТОО МФО «365 ТЕНГЕ»', hide: 'block' },
        { title: 'ТОО «МФО «Friendly Finance Kazakhstan»', hide: 'block' },
        { title: 'ТОО  МФО «TAS FINANCE GROUP»', hide: 'block' },
      ],
      hideOrganization: 'none',
      cursorChose: false,
      step2BlockAlertDisplay: 'none',
      step2BlockAlertMarginTop: 0,
      amountOption: '',
      date: '',
      whatAProblem: '',
      step2BackStep1: false,
      token: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.step2MobileVersion();
    })
    window.addEventListener('click', this.step2ClickScreen);
    window.addEventListener('resize', this.step2MobileVersion);
  },
  methods: {
    async submitRequestSecondStep() {
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/secondStep', {
        'organization': [ this.organization, this.amountOption, this.date, this.whatAProblem ],
        'token': this.token
      })
          .then(response => {
            if (response.data.success) {
              console.log(response.data);
              this.obfStep3BlockAlerts();
            }
            else {
              console.log(response.data.error);
            }
          })
          .catch(error => {
            console.log('error: '+error);
          });
    },
    onClickOrganizationsList(e) {
      if (e.target.getAttribute('class') === 'blockAlert-step2__organizations-input' ||
          e.target.getAttribute('class') === 'blockAlert-step2__organizationsList' ||
          e.target.getAttribute('class') === 'blockAlert-step2__organizationsList-option'
      ) {
        this.hideOrganization = 'block';
      }
      else {
        this.hideOrganization = 'none';
      }
    },
    enterOrganizationInput() {
      if (this.organization === '') {
        for (let i = 0; i < this.organizations.length; i++) this.organizations[i].hide = 'block';
        return;
      }
      for (let i = 0; i < this.organizations.length; i++) {
        if (this.organizations[i].title.indexOf(this.organization) !== -1) {
          this.organizations[i].hide = 'block';
        }
        else this.organizations[i].hide = 'none';
      }
    },
    onClickOrganizationsListOption(index) {
      this.organization = this.organizations[index].title;
      this.enterOrganizationInput();
    },
    step2ClickScreen() {
      if (this.$refs.step3BlockAlerts.step3BackStep2 === true) {
        this.$refs.step3BlockAlerts.step3BlockAlertClose();
        this.step2BlockAlertOpen();
      }
      this.step2MobileVersion();
    },
    step2MobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.step2BlockAlertDisplay === 'block' && this.$refs.infoStep2BlockAlert.clientHeight >= window.innerHeight) {
          this.step2BlockAlertMarginTop = (this.$refs.infoStep2BlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    step2BlockAlertOpen() {
      this.step2BlockAlertDisplay = 'block';
    },
    step2BlockAlertClose() {
      this.step2BlockAlertDisplay = 'none';
      this.cursorChose = false;
    },
    obfStep1BlockAlertsBack() {
      this.step2BackStep1 = true;
    },
    obfStep3BlockAlerts() {
      this.step2BlockAlertClose();
      this.$refs.step3BlockAlerts.step3BackStep2 = false;
      this.$refs.step3BlockAlerts.token = this.token;
      this.$refs.step3BlockAlerts.step3BlockAlertOpen();
    },
  },
}
</script>

<style>
@import url('/css/block/step2.css');
@import url('/css/block/mobile/step2.css');
</style>

