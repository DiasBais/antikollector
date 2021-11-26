<template>
  <div class="step2" v-on:click="onClickList($event)">
    <div class="step2__content">
      <div class="step2__loading">
        <div class="step2__loading-title">Шаг 2</div>
        <div class="step2__loading-show">
          <div class="step2__loading-show-filled"></div>
        </div>
      </div>
      <div class="step2__body">
        <div class="step2__right">
          <div class="step2__error" v-if="error">Error: <span>{{ error }}</span></div>
          <div class="step2__organizations">
            <p class="step2__organizations-title">Кому должен</p>
            <input type="text"
                   autocomplete="new_organization"
                   v-model="mfos[acting].organization"
                   :style="(hideOrganization==='none'?'border-radius: 10px':'')"
                   v-on:click="onClickList"
                   v-on:keyup="enterOrganizationInput"
                   class="step2__organizations-input"
            >
            <div class="step2__organizationsList"
                 :style="'display: '+hideOrganization"
            >
              <span class="step2__organizationsList-option"
                    v-for="(organization,index) in organizations"
                    :key="'O'+index"
                    v-html="organization.title"
                    :style="'display: '+organization.hide"
                    v-on:click="onClickOrganizationsListOption(index)"
              ></span>
            </div>
          </div>
          <div class="step2__input">
            <p class="step2__input-title">Сколько должен</p>
            <div class="step2__input-part">
              <input class="step2__input-value" type="number" autocomplete="new_arrears" v-model="mfos[acting].arrears" v-on:keydown="onKeyDownArrears($event)">
              <span class="step2__input-price">тенге</span>
            </div>
          </div>
          <div class="step2__input">
            <p class="step2__input-title">Когда брал кредит</p>
            <input class="step2__input-value" type="date" autocomplete="new_date" v-model="mfos[acting].date">
          </div>

          <div class="step2__problems">
            <p class="step2__problems-title">Какая проблема</p>
            <input type="text"
                   autocomplete="new_problem"
                   v-model="mfos[acting].problem"
                   :style="(hideProblem==='none'?'border-radius: 10px':'')"
                   v-on:click="onClickList"
                   v-on:keyup="enterProblemInput"
                   class="step2__problems-input"
            >
            <div class="step2__problemsList"
                 :style="'display: '+hideProblem"
            >
              <span class="step2__problemsList-option"
                    v-for="(problem,index) in problems"
                    :key="'P'+index"
                    v-html="problem.title"
                    :style="'display: '+problem.hide"
                    v-on:click="onClickProblemsListOption(index)"
              ></span>
            </div>
          </div>
          <div class="step2__descriptionProblems">
            <p class="step2__descriptionProblems-title">Опишите проблему</p>
            <input type="text" autocomplete="new_descriptionProblem" class="step2__descriptionProblems-input" v-model="mfos[acting].descriptionProblem">
          </div>
          <div class="step2__addMFO" v-on:click="step2__addMFO">+ Добавить МФО</div>
        </div>
        <div class="step2__left">
          <div class="step2__left-content" v-if="(mfos.length>1)">
            <div class="step2__mfo"
                 v-for="(item,index) in (mfos.length)"
                 :key="'W'+index"
                 v-on:mousemove="onMouseMoveMFO(index)"
                 v-on:mouseleave="onMouseleaveMFO(index)"
            >
              <img class="step2__mfo-act"
                   :src="imageMFO[index].imageAct"
                   v-on:click="step2__actMFO(index)"
              >
              <p>{{ item }}</p>
              <img class="step2__mfo-del"
                   :src="imageMFO[index].imageDel"
                   v-on:click="step2__delMFO(index)"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="step2__footer">
        <input class="step2__back" type="button" value="Назад" v-on:click="comeBackPage">
        <input class="step2__submit" type="button" value="Защитить меня" v-on:click="submitRequestSecondStep">
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
            descriptionProblem: '',
          },
      ],
      organizations: [
        { title: 'ТОО "МФО"I-CREDIT.KZ"', hide: 'block' },
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
        { title: 'i-credit.kz', hide: 'block' },
        { title: 'moneyman.kz', hide: 'block' },
        { title: 'ccloan.kz', hide: 'block' },
        { title: 'zaimer.kz', hide: 'block' },
        { title: 'solva.kz', hide: 'block' },
        { title: '4slovo.kz', hide: 'block' },
        { title: 'creditplus.kz', hide: 'block' },
        { title: '7kredit.kz', hide: 'block' },
        { title: 'credit365.kz', hide: 'block' },
        { title: 'turbomoney.kz', hide: 'block' },
        { title: 'quickmoney.kz', hide: 'block' },
        { title: 'kclp.kz', hide: 'block' },
        { title: 'dengiclick.kz', hide: 'block' },
        { title: 'dopo.kz', hide: 'block' },
        { title: 'koke.kz', hide: 'block' },
        { title: 'tengo.kz', hide: 'block' },
        { title: 'kviku.com/kz', hide: 'block' },
        { title: 'zanachka.kz', hide: 'block' },
        { title: 'gofingo.kz', hide: 'block' },
        { title: 'Kredit24.kz', hide: 'block' },
        { title: 'gm24.kz', hide: 'block' },
        { title: 'aLTenge', hide: 'block' },
        { title: '1kredit.kz', hide: 'block' },
        { title: 'TengeDa', hide: 'block' },
        { title: 'CashU', hide: 'block' },
        { title: '365 Тенге', hide: 'block' },
        { title: 'Mycredit KZ', hide: 'block' },
        { title: 'TAS GROUP', hide: 'block' },
        { title: 'MoneyMan', hide: 'block' },
        { title: 'ccloan.kz', hide: 'block' },
        { title: 'Займер. Робот онлайн займов', hide: 'block' },
        { title: 'solva', hide: 'block' },
        { title: 'Честное слово', hide: 'block' },
        { title: 'credit plus', hide: 'block' },
        { title: 'Credit 365', hide: 'block' },
        { title: 'turbo money', hide: 'block' },
        { title: 'АКША БАР', hide: 'block' },
        { title: 'Quick money', hide: 'block' },
        { title: 'Kaz Credit Line', hide: 'block' },
        { title: 'Деньги Click', hide: 'block' },
        { title: 'До получки', hide: 'block' },
        { title: 'kviku', hide: 'block' },
        { title: 'zana4ka.kz', hide: 'block' },
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
      imageMFO: [
        { imageAct: '/images/activeActive.png', imageDel: '/images/deleteActive.png' }
      ],
      activeImageAct: '/images/activeActive.png',
      activeImageDel: '/images/deleteActive.png',
      defaultImageAct: '/images/active.png',
      defaultImageDel: '/images/delete.png',
      imageChangeMoveActMFO: '/images/moveActive.png',
      imageChangeMoveDelMFO: '/images/moveDelete.png',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
  },
  methods: {
    onMouseMoveMFO(index) {
      if (index !== this.acting) {
        this.imageMFO[index].imageAct = this.imageChangeMoveActMFO;
        this.imageMFO[index].imageDel = this.imageChangeMoveDelMFO;
      }
    },
    onMouseleaveMFO(index) {
      if (index !== this.acting) {
        this.imageMFO[index].imageAct = this.defaultImageAct;
        this.imageMFO[index].imageDel = this.defaultImageDel;
      }
    },
    step2__addMFO() {
      if (this.mfos.length < 10) {
        this.imageMFO.push({ imageAct: this.defaultImageAct, imageDel: this.defaultImageDel });
        this.mfos.push({organization:'',arrears:'',date:'',problem:''});
        this.step2__actMFO(this.mfos.length-1);
      }
      else this.error = 'Максимальная количество организации';
    },
    step2__actMFO(i) {
      this.imageMFO[this.acting].imageAct = this.defaultImageAct;
      this.imageMFO[this.acting].imageDel = this.defaultImageDel;
      this.acting = i;
      this.imageMFO[i].imageAct = this.activeImageAct;
      this.imageMFO[i].imageDel = this.activeImageDel;
      this.enterOrganizationInput();
      this.enterProblemInput();
    },
    step2__delMFO(index) {
      if (this.mfos.length > 0) {
        if (this.acting >= index) {
          this.acting -= 1;
          this.imageMFO[this.acting].imageAct = this.activeImageAct;
          this.imageMFO[this.acting].imageDel = this.activeImageDel;
        }
        if (this.mfos.length-1 === index) {
          this.imageMFO.splice(this.imageMFO.indexOf(index));
          this.mfos.splice(this.mfos.indexOf(index));
        }
        else {
          for (let i = 0; i < this.mfos.length-1; i++) {
            if (index <= i) {
              this.imageMFO[i] = this.imageMFO[i+1];
              this.mfos[i] = this.mfos[i+1];
            }
          }
          this.imageMFO.splice(this.imageMFO.length-1, 1);
          this.mfos.splice(this.mfos.length-1, 1);
        }
      }
    },
    async submitRequestSecondStep() {
      this.error = '';
      if (this.validateStep2()) return;
      let newMFO = [ '' ];
      for (let i = 0; i < this.mfos.length; i++) {
        if (this.mfos.length-1 === i) newMFO[0] += this.mfos[i].organization+'-'+this.mfos[i].arrears+'-'+(this.mfos[i].date.split('-').join('.'))+'-'+this.mfos[i].problem+'-'+this.mfos[i].descriptionProblem;
        else newMFO[0] += this.mfos[i].organization+'-'+this.mfos[i].arrears+'-'+(this.mfos[i].date.split('-').join('.'))+'-'+this.mfos[i].problem+'-'+this.mfos[i].descriptionProblem+', ';
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
              await localStorage.setItem('mfos', JSON.stringify(this.mfos));
              await localStorage.setItem('priceMFOS', (10000+(this.mfos.length-1)*5000));
              this.$router.push({path: '/step-3'});
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
      window.history.back();
    },
    validateStep2() {
      for (let i = 0; i < this.mfos.length; i++) {
        if (!this.mfos[i].organization) {
          this.error = 'Поле['+i+'] кому должен обязательно для заполнения';
          return true;
        }
        else if (!this.mfos[i].arrears) {
          this.error = 'Поле['+i+'] сколько должен обязательно для заполнения';
          return true;
        }
        else if (!this.mfos[i].date) {
          this.error = 'Поле['+i+'] когда брал кредит обязательно для заполнения';
          return true;
        }
        else if (!this.mfos[i].problem) {
          this.error = 'Поле['+i+'] какая проблема обязательно для заполнения';
          return true;
        }
        else if (!this.mfos[i].descriptionProblem) {
          this.error = 'Поле['+i+'] опишите проблема обязательно для заполнения';
          return true;
        }
      }
      return false;
    },
    onClickList(e) {
      if (e.target.getAttribute('class') === 'step2__organizations-input' ||
          e.target.getAttribute('class') === 'step2__organizationsList' ||
          e.target.getAttribute('class') === 'step2__organizationsList-option'
      ) {
        this.hideProblem = 'none';
        this.hideOrganization = 'block';
      }
      else if (e.target.getAttribute('class') === 'step2__problems-input' ||
          e.target.getAttribute('class') === 'step2__problemsList' ||
          e.target.getAttribute('class') === 'step2__problemsList-option'
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
        if (this.organizations[i].title.toLowerCase().indexOf(this.mfos[this.acting].organization.toLowerCase()) !== -1 &&
            this.organizations[i].title.toLowerCase() !== this.mfos[this.acting].organization.toLowerCase()) {
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
        if (this.problems[i].title.toLowerCase().indexOf(this.mfos[this.acting].problem.toLowerCase()) !== -1 &&
            this.problems[i].title.toLowerCase() !== this.mfos[this.acting].problem.toLowerCase()) {
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
@import url('/css/block/step2.css');
@import url('/css/block/mobile/step2.css');
</style>
