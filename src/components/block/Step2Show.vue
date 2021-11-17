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
        <div class="Step2Show__organizations">
          <p class="Step2Show__organizations-title">Кому должен</p>
          <input type="text"
                 v-model="organization"
                 :style="(hideOrganization==='none'?'border-radius: 10px':'')"
                 v-on:click="onClickList"
                 v-on:keyup="enterOrganizationInput"
                 class="Step2Show__organizations-input"
          >
          <div class="Step2Show__organizationsList"
               :style="'display: '+hideOrganization"
          >
            <span class="Step2Show__organizationsList-option"
                  v-for="(organization,index) in organizations"
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
            <input class="Step2Show__input-value" type="number">
            <span class="Step2Show__input-price">тенге</span>
          </div>
        </div>
        <div class="Step2Show__input">
          <p class="Step2Show__input-title">Когда брал кредит</p>
          <input class="Step2Show__input-value" type="date">
        </div>

        <div class="Step2Show__problems">
          <p class="Step2Show__problems-title">Какая проблема</p>
          <input type="text"
                 v-model="problem"
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

      </div>
      <div class="Step2Show__footer">
        <input class="Step2Show__back" type="button" value="Назад">
        <input class="Step2Show__submit" type="button" value="Защитить меня">
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      problem: '',
      problems: [
        { title: 'Кредитор', hide: 'block' },
        { title: 'Коллектор', hide: 'block' },
        { title: 'ЧСИ (частный судебный исполнитель)', hide: 'block' },
        { title: 'Нотариус', hide: 'block' },
      ],
      hideProblem: 'none',
    }
  },
  methods: {
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
    enterProblemInput() {
      if (this.problem === '') {
        for (let i = 0; i < this.problems.length; i++) this.problems[i].hide = 'block';
        return;
      }
      for (let i = 0; i < this.problems.length; i++) {
        if (this.problems[i].title.toLowerCase().indexOf(this.problem.toLowerCase()) !== -1) {
          this.problems[i].hide = 'block';
        }
        else this.problems[i].hide = 'none';
      }
    },
    onClickProblemsListOption(index) {
      this.problem = this.problems[index].title;
      this.enterProblemInput();
    },
  }
}
</script>

<style>
@import url('/css/block/Step2Show.css');
@import url('/css/block/mobile/Step2Show.css');
</style>
