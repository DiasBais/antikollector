<template>
  <div>
    <div><button v-on:click="blockAlertOpen('login')">login</button></div>
    <div><button v-on:click="blockAlertOpen('register')">register</button></div>
    <div><button v-on:click="blockAlertOpen('step1')">step1</button></div>
    <div><button v-on:click="blockAlertOpen('step2')">step2</button></div>
    <div><button v-on:click="blockAlertOpen('step3')">step3</button></div>
    <div><button v-on:click="blockAlertOpen('step4')">step4</button></div>
  <div class="blockAlert" :style="'display: '+blockAlertDisplay">
    <div class="blockAlert__pos">
      <div class="blockAlert__background" v-on:click="blockAlertClose"></div>
      <div class="blockAlert__content" ref="infoBlockAlert">
        <div class="blockAlert__loading" v-if="blockAlert.current.loading">
          <div class="blockAlert__loading-title">Шаг {{ blockAlert.current.loading.step }}</div>
          <div class="blockAlert__loading-view">
            <div class="blockAlert__loading-view-filled" :style="'width: '+(blockAlert.current.loading.step*25)+'%'"></div>
          </div>
        </div>
        <div class="blockAlert__title" v-html="blockAlert.current.title"></div>
        <form action="#">
          <div class="blockAlert__body" v-if="blockAlert.current.listInput || blockAlert.current.bottomPart">
            <div class="blockAlert__input" v-for="(inputElm,index) in blockAlert.current.listInput" :key="'L'+index">
              <p>{{ inputElm.name }}<span v-if="inputElm.require">*</span></p>
              <input value="">
            </div>
            <div class="blockAlert__links" v-if="blockAlert.current.bottomPart" v-html="blockAlert.current.bottomPart"></div>
          </div>
          <div class="blockAlert__active" v-if="blockAlert.current.nameSubmit">
            <input type="submit" :value="blockAlert.current.nameSubmit">
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockAlert: {
        current: {},
        items: {
          login: {
            title: 'Войти в личный кабинет',
            loading: 0,
            listInput: [
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'Введите пароль',
                require: true,
              },
            ],
            bottomPart: '<p>Нет аккаунта? <span>Зарегестрируйтесь</span></p><p>Забыли пароль?</p>',
            nameSubmit: 'Войти',
          },
          register: {
            title: '<p>Зарегестрируйся и получи скидку на последующие услуги</p><span v-if="true">-50%</span>',
            loading: 0,
            listInput: [
              {
                name: 'ФИО',
                require: true,
              },
              {
                name: 'Телефонный номер',
                require: true,
              },
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'E-mail',
                require: true,
              },
              {
                name: 'Придуйате пароль',
                require: true,
              },
            ],
            bottomPart: '',
            nameSubmit: 'Получить скидку',
          },
          step1: {
            title: '<p>Зарегестрируйся и получи скидку на последующие услуги</p><span v-if="true">-50%</span>',
            loading: {
              step: 1,
            },
            listInput: [
              {
                name: 'ФИО',
                require: true,
              },
              {
                name: 'Телефонный номер',
                require: true,
              },
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'E-mail',
                require: true,
              },
              {
                name: 'Придуйате пароль',
                require: true,
              },
            ],
            bottomPart: '',
            nameSubmit: 'Получить скидку',
          },
          step2: {
            title: '<p>Зарегестрируйся и получи скидку на последующие услуги</p><span v-if="true">-50%</span>',
            loading: {
              step: 2,
            },
            listInput: [
              {
                name: 'ФИО',
                require: true,
              },
              {
                name: 'Телефонный номер',
                require: true,
              },
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'E-mail',
                require: true,
              },
              {
                name: 'Придуйате пароль',
                require: true,
              },
            ],
            bottomPart: '',
            nameSubmit: 'Получить скидку',
          },
          step3: {
            title: '<p>Зарегестрируйся и получи скидку на последующие услуги</p><span v-if="true">-50%</span>',
            loading: {
              step: 3,
            },
            listInput: [
              {
                name: 'ФИО',
                require: true,
              },
              {
                name: 'Телефонный номер',
                require: true,
              },
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'E-mail',
                require: true,
              },
              {
                name: 'Придуйате пароль',
                require: true,
              },
            ],
            bottomPart: '',
            nameSubmit: 'Получить скидку',
          },
          step4: {
            title: '<p>Зарегестрируйся и получи скидку на последующие услуги</p><span v-if="true">-50%</span>',
            loading: {
              step: 4,
            },
            listInput: [
              {
                name: 'ФИО',
                require: true,
              },
              {
                name: 'Телефонный номер',
                require: true,
              },
              {
                name: 'ИИН',
                require: true,
              },
              {
                name: 'E-mail',
                require: true,
              },
              {
                name: 'Придуйате пароль',
                require: true,
              },
            ],
            bottomPart: '',
            nameSubmit: 'Получить скидку',
          },
        },
      },
      blockAlertDisplay: 'none',
      blockAlertMarginTop: 0,
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.mobileVersion();
    })
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.blockAlert.items.register.title = '<p>Зарегестрируйся и получи скидку <span>50%</span> на последующие услуги</p>';
      }
      else {
        if (this.$refs.infoBlockAlert.clientHeight >= window.innerHeight) {
          this.blockAlertMarginTop = (this.$refs.infoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    blockAlertOpen(elm) {
      this.blockAlertDisplay = 'block';
      if (elm === 'login') this.blockAlert.current = this.blockAlert.items.login;
      else if (elm === 'register') this.blockAlert.current = this.blockAlert.items.register;
      else if (elm === 'step1') this.blockAlert.current = this.blockAlert.items.step1;
      else if (elm === 'step2') this.blockAlert.current = this.blockAlert.items.step2;
      else if (elm === 'step3') this.blockAlert.current = this.blockAlert.items.step3;
      else if (elm === 'step4') this.blockAlert.current = this.blockAlert.items.step4;
      this.mobileVersion();
    },
    blockAlertClose() {
      this.blockAlertDisplay = 'none';
      this.blockAlert.current = {};
    },
  },
}
</script>

<style>
@import url('/css/login.css');
@import url('/css/mobile/login.css');
</style>

