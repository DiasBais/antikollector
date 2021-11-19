<template>
  <div class="Step2Show" v-on:click="onClickList($event)">
    <div class="Step2Show__content">
      <div class="Step2Show__loading">
        <div class="Step2Show__loading-title">Шаг 2</div>
        <div class="Step2Show__loading-show">
          <div class="Step2Show__loading-show-filled"></div>
        </div>
      </div>
      <div class="Step2Show__body">
        <div class="Step2Show__left" v-if="(mfos.length>1)">
          <div class="Step2Show__mfo" v-for="(item,index) in (mfos.length)" :key="'W'+index">
            <img class="Step2Show__mfo-act" src="/images/active.png" v-on:click="Step2Show__actMFO(index)">
            <p>{{ item }}</p>
            <img class="Step2Show__mfo-del" src="/images/delete.png" v-on:click="Step2Show__delMFO(index)">
          </div>
        </div>
        <div class="Step2Show__right">
          <div class="Step1Show__error" v-if="error">Error: <span>{{ error }}</span></div>
          <div class="Step2Show__organizations">
            <p class="Step2Show__organizations-title">Кому должен</p>
            <input type="text"
                   v-model="mfos[acting].organization"
                   :style="(hideOrganization==='none'?'border-radius: 10px':'')"
                   v-on:click="onClickList"
                   v-on:keyup="enterOrganizationInput"
                   class="Step2Show__organizations-input"
            >
            <div class="Step2Show__organizationsList"
                 :style="'display: '+hideOrganization"
            >
              <span class="Step2Show__organizationsList-option"
                    v-for="(organization,index) in mfos[acting].organizations"
                    :key="'O'+index"
                    v-html="organization.title"
                    :style="'display: '+organization.hide"
                    v-on:click="onClickOrganizationsListOption(index)"
              ></span>
            </div>
          </div>
          <div class="Step2Show__input">
            <p class="Step2Show__input-title">Сколько должен</p>
            <div class="Step2Show__input-part">
              <input class="Step2Show__input-value" type="number" v-model="mfos[acting].arrears" v-on:keydown="onKeyDownArrears($event)">
              <span class="Step2Show__input-price">тенге</span>
            </div>
          </div>
          <div class="Step2Show__input">
            <p class="Step2Show__input-title">Когда брал кредит</p>
            <input class="Step2Show__input-value" type="date" v-model="mfos[acting].date">
          </div>

          <div class="Step2Show__problems">
            <p class="Step2Show__problems-title">Какая проблема</p>
            <input type="text"
                   v-model="mfos[acting].problem"
                   :style="(hideProblem==='none'?'border-radius: 10px':'')"
                   v-on:click="onClickList"
                   v-on:keyup="enterProblemInput"
                   class="Step2Show__problems-input"
            >
            <div class="Step2Show__problemsList"
                 :style="'display: '+hideProblem"
            >
              <span class="Step2Show__problemsList-option"
                    v-for="(problem,index) in problems"
                    :key="'P'+index"
                    v-html="problem.title"
                    :style="'display: '+problem.hide"
                    v-on:click="onClickProblemsListOption(index)"
              ></span>
            </div>
          </div>
          <div class="Step2Show__addMFO" v-on:click="Step2Show__addMFO">+ Добавить МФО</div>
        </div>
      </div>
      <div class="Step2Show__footer">
        <input class="Step2Show__back" type="button" value="Назад" v-on:click="comeBackPage">
        <input class="Step2Show__submit" type="button" value="Защитить меня" v-on:click="submitRequestSecondStep">
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
      acting: 0,
      mfos: [
          {
            organization: '',
            arrears: '',
            date: '',
            problem: '',
          },
      ],
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
      problems: [
        { title: 'Кредитор', hide: 'block' },
        { title: 'Коллектор', hide: 'block' },
        { title: 'ЧСИ (частный судебный исполнитель)', hide: 'block' },
        { title: 'Нотариус', hide: 'block' },
      ],
      hideProblem: 'none',
      error: '',
      token: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    localStorage.setItem('smsCode', '');
  },
  methods: {
    Step2Show__addMFO() {
      if (this.mfos.length < 10) {
        this.mfos.push({organization:'',arrears:'',date:'',problem:''});
      }
      else this.error = 'Максимальная количество организации';
    },
    Step2Show__actMFO(i) {
      this.acting = i;
    },
    Step2Show__delMFO(index) {
      if (this.mfos.length > 0) {
        if (this.acting >= index) this.acting -= 1;
        if (this.mfos.length-1 === index) this.mfos.splice(this.mfos.indexOf(index));
        else {
          for (let i = 0; i < this.mfos.length-1; i++) {
            if (index <= i) this.mfos[i] = this.mfos[i+1];
          }
          this.mfos.splice(this.mfos.length-1, 1);
        }
      }
    },
    async submitRequestSecondStep() {
      this.error = '';
      if (this.validateStep2()) return;
      let newMFO = [];
      for (let i = 0; i < this.mfos.length; i++) {
        newMFO.push([ this.mfos[i].organization, this.mfos[i].arrears, this.mfos[i].date, this.mfos[i].problem ]);
      }
      const axios = require('axios');
      await axios.post('https://crediter.kz/api/secondStep', {
        'organization': newMFO,
        'token': this.token,
      })
          .then(async response => {
            if (response.data.success) {
              await this.$session.set('step2success', true);
              await localStorage.setItem('token', this.token);
              this.$router.push({path: '/step3show'});
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
    onKeyDownArrears(e) {
      if (!(e.key >= '0' && e.key <= '9') && !(e.key === 'Backspace')) e.preventDefault();
    },
    comeBackPage() {
      this.$router.push(-2);
    },
    validateStep2() {
      if (!this.mfos[this.acting].organization) {
        this.error = 'Поле кому должен обязательно для заполнения';
      }
      else if (!this.mfos[this.acting].arrears) {
        this.error = 'Поле сколько должен обязательно для заполнения';
      }
      else if (!this.mfos[this.acting].date) {
        this.error = 'Поле когда брал кредит обязательно для заполнения';
      }
      else if (!this.mfos[this.acting].problem) {
        this.error = 'Поле какая проблема обязательно для заполнения';
      }
      else return false;
      return true;
    },
    onClickList(e) {
      if (e.target.getAttribute('class') === 'Step2Show__organizations-input' ||
          e.target.getAttribute('class') === 'Step2Show__organizationsList' ||
          e.target.getAttribute('class') === 'Step2Show__organizationsList-option'
      ) {
        this.hideProblem = 'none';
        this.hideOrganization = 'block';
      }
      else if (e.target.getAttribute('class') === 'Step2Show__problems-input' ||
          e.target.getAttribute('class') === 'Step2Show__problemsList' ||
          e.target.getAttribute('class') === 'Step2Show__problemsList-option'
      ) {
        this.hideOrganization = 'none';
        this.hideProblem = 'block';
      }
      else {
        this.hideProblem = 'none';
        this.hideOrganization = 'none';
      }
    },
    enterOrganizationInput() {
      if (this.mfos[this.acting].organization === '') {
        for (let i = 0; i < this.organizations.length; i++) this.organizations[i].hide = 'block';
        return;
      }
      for (let i = 0; i < this.organizations.length; i++) {
        if (this.organizations[i].title.indexOf(this.mfos[this.acting].organization) !== -1) {
          this.organizations[i].hide = 'block';
        }
        else this.organizations[i].hide = 'none';
      }
    },
    onClickOrganizationsListOption(index) {
      this.mfos[this.acting].organization = this.organizations[index].title;
      this.enterOrganizationInput();
    },
    enterProblemInput() {
      if (this.mfos[this.acting].problem === '') {
        for (let i = 0; i < this.problems.length; i++) this.problems[i].hide = 'block';
        return;
      }
      for (let i = 0; i < this.problems.length; i++) {
        if (this.problems[i].title.toLowerCase().indexOf(this.mfos[this.acting].problem.toLowerCase()) !== -1) {
          this.problems[i].hide = 'block';
        }
        else this.problems[i].hide = 'none';
      }
    },
    onClickProblemsListOption(index) {
      this.mfos[this.acting].problem = this.problems[index].title;
      this.enterProblemInput();
    },
  }
}
</script>

<style>
@import url('/css/block/Step2Show.css');
@import url('/css/block/mobile/Step2Show.css');
</style>
